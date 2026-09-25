/** Run only against an isolated, migrated database; see docs/consultation-promos.md. */
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { getPayload } from "payload";
import config from "../src/payload.config";
import {
  lookupPromo,
  saveConsultation,
  PromoError,
} from "../src/lib/consultation/service";
import { validateConsultation } from "../src/lib/consultation/validation";
import { POST as contact } from "../src/app/api/contact/route";
import { POST as verify } from "../src/app/api/consultation/promo/route";

if (
  !process.env.CONSULTATION_TEST_DATABASE_URL ||
  process.env.DATABASE_URL !== process.env.CONSULTATION_TEST_DATABASE_URL
)
  throw new Error(
    "Set DATABASE_URL and CONSULTATION_TEST_DATABASE_URL to the same isolated test database.",
  );

// Never send a real email during this test, even if .env.local contains credentials.
const originalFetch = globalThis.fetch;
let emailFails = true;
let emailCount = 0;
globalThis.fetch = async (url) => {
  if (!String(url).startsWith("https://api.resend.com/emails"))
    return Response.json({});
  emailCount++;
  if (emailFails)
    return Response.json(
      { message: "Test provider failure", name: "application_error" },
      { status: 500 },
    );
  return Response.json({ id: "test-email" });
};
process.env.RESEND_API_KEY = "re_test_only";
process.env.CONTACT_SENDER_EMAIL = "test@example.com";
process.env.CONTACT_RECEIVER_EMAIL = "test@example.com";

const payload = await getPayload({ config });
const suffix = randomUUID().slice(0, 8).toUpperCase();
const base = {
  studentName: "Test Student",
  phone: "+66812345678",
  preferredDate: "2099-09-15",
  preferredTime: "13:00-14:00",
  program: "ged",
  source: "qr",
};
const input = (code: string, requestKey = randomUUID()) => ({
  ...base,
  promoCode: code,
  requestKey,
});
const data = (code: string, requestKey = randomUUID()) => {
  const result = validateConsultation(input(code, requestKey), "2026-09-24");
  assert.ok(result.ok);
  return result.value;
};
const request = (body: unknown) =>
  new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

try {
  const venue = await payload.create({
    collection: "venues",
    data: { name: `Test Cafe ${suffix}`, active: true },
  });
  const createCode = (label: string, active = true) =>
    payload.create({
      collection: "promo-codes",
      data: { code: `${label}-${suffix}`, venue: venue.id, active },
    });
  const promo = await createCode("RACE");
  const second = await createCode("SECOND");
  assert.equal(
    (await lookupPromo(payload, ` ${promo.code.toLowerCase()} `)).venue.id,
    venue.id,
  );
  assert.equal((await lookupPromo(payload, second.code)).venue.id, venue.id);
  assert.equal(
    (await payload.findByID({ collection: "promo-codes", id: promo.id }))
      .usedAt,
    null,
  );
  await assert.rejects(() =>
    payload.create({
      collection: "promo-codes",
      data: { code: promo.code.toLowerCase(), venue: venue.id, active: true },
    }),
  );
  const inactive = await createCode("INACTIVE", false);
  await assert.rejects(() => lookupPromo(payload, inactive.code), PromoError);
  await payload.update({
    collection: "venues",
    id: venue.id,
    data: { active: false },
  });
  await assert.rejects(() => lookupPromo(payload, second.code), PromoError);
  await payload.update({
    collection: "venues",
    id: venue.id,
    data: { active: true },
  });

  const attempts = await Promise.allSettled(
    Array.from({ length: 5 }, () =>
      saveConsultation(payload, data(promo.code)),
    ),
  );
  assert.equal(
    attempts.filter((result) => result.status === "fulfilled").length,
    1,
  );
  for (const attempt of attempts)
    if (attempt.status === "rejected")
      assert.ok(attempt.reason instanceof PromoError);
  assert.equal(
    (
      await payload.count({
        collection: "consultation-requests",
        where: { promoCode: { equals: promo.code } },
      })
    ).totalDocs,
    1,
  );
  await assert.rejects(
    () => lookupPromo(payload, promo.code),
    /already been used/,
  );

  const retryKey = randomUUID();
  const retries = await Promise.all(
    Array.from({ length: 3 }, () =>
      saveConsultation(payload, data(second.code, retryKey)),
    ),
  );
  assert.equal(new Set(retries.map((value) => value.request.id)).size, 1);
  assert.equal(retries.filter((value) => value.created).length, 1);

  // Fail after creating the request: both the request and redemption must roll back.
  const rollback = await createCode("ROLLBACK");
  const originalUpdate = payload.update.bind(payload);
  payload.update = (async (args: Parameters<typeof payload.update>[0]) => {
    if (args.collection === "promo-codes")
      throw new Error("Injected write failure");
    return originalUpdate(args);
  }) as typeof payload.update;
  try {
    await assert.rejects(
      () => saveConsultation(payload, data(rollback.code)),
      /Injected write failure/,
    );
  } finally {
    payload.update = originalUpdate;
  }
  assert.equal(
    (
      await payload.count({
        collection: "consultation-requests",
        where: { promoCode: { equals: rollback.code } },
      })
    ).totalDocs,
    0,
  );
  await lookupPromo(payload, rollback.code);

  const apiCode = await createCode("API");
  const apiInput = input(apiCode.code);
  assert.equal(
    (await verify(request({ promoCode: apiCode.code }))).status,
    200,
  );
  assert.equal(
    (await contact(request({ ...apiInput, establishment: "Forged venue" })))
      .status,
    400,
  );
  assert.equal((await contact(request(apiInput))).status, 200);
  assert.equal((await contact(request(apiInput))).status, 200);
  assert.equal(emailCount, 1);
  const saved = (
    await payload.find({
      collection: "consultation-requests",
      where: { requestKey: { equals: apiInput.requestKey } },
      depth: 0,
    })
  ).docs[0];
  assert.equal(saved.establishment, venue.name);
  assert.equal(saved.notificationStatus, "failed");
  assert.equal((await contact(request(input(apiCode.code)))).status, 400);

  // Admin retry uses the existing request without deadlocking its transaction.
  emailFails = false;
  const retried = await payload.update({
    collection: "consultation-requests",
    id: saved.id,
    data: { retryNotification: true },
  });
  assert.equal(retried.notificationStatus, "sent");
  assert.equal(retried.retryNotification, false);
  assert.equal(emailCount, 2);
  await payload.update({
    collection: "consultation-requests",
    id: saved.id,
    data: { retryNotification: true },
  });
  assert.equal(emailCount, 2);

  for (let index = 0; index < 2; index++) {
    assert.equal(
      (
        await contact(
          request({ ...base, source: "website", requestKey: randomUUID() }),
        )
      ).status,
      200,
    );
  }
  for (const collection of [
    "venues",
    "promo-codes",
    "consultation-requests",
  ] as const) {
    await assert.rejects(() =>
      payload.find({ collection, overrideAccess: false, user: null }),
    );
  }
  const admin = await payload.create({
    collection: "users",
    data: {
      name: "Test Admin",
      email: `test-${suffix}@example.com`,
      password: randomUUID(),
    },
  });
  const changed = await payload.update({
    collection: "promo-codes",
    id: promo.id,
    overrideAccess: false,
    user: admin,
    data: { code: `CHANGED-${suffix}`, usedAt: null, venue: venue.id },
  });
  assert.equal(changed.code, promo.code);
  assert.ok(changed.usedAt);
  await assert.rejects(() =>
    payload.delete({
      collection: "promo-codes",
      id: promo.id,
      overrideAccess: false,
      user: admin,
    }),
  );
  console.log(
    "PASS: real PostgreSQL concurrency, rollback, idempotency, API validation, email retry and CMS access controls",
  );
} finally {
  globalThis.fetch = originalFetch;
  await payload.destroy();
}
