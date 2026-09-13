import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// Exercise the real TypeScript modules without adding a test framework.
const sent = [];
let providerFailure = false;
const cache = new Map();
function load(filename) {
  filename = path.resolve(__dirname, "..", filename);
  if (cache.has(filename)) return cache.get(filename);
  const source = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const loadedModule = { exports: {} };
  const localRequire = (id) => {
    if (id === "resend")
      return {
        Resend: class {
          emails = {
            send: async (message) => {
              sent.push(message);
              if (providerFailure)
                throw new Error("private provider information");
              return { error: null };
            },
          };
        },
      };
    return load(
      id.startsWith("@/")
        ? `src/${id.slice(2)}.ts`
        : `${path.resolve(path.dirname(filename), id)}.ts`,
    );
  };
  vm.runInThisContext(`(function(require,module,exports){${source}\n})`, {
    filename,
  })(localRequire, loadedModule, loadedModule.exports);
  cache.set(filename, loadedModule.exports);
  return loadedModule.exports;
}
const { validateConsultation, pattayaToday, localToday } = load(
  "src/lib/consultation/validation.ts",
);
const { parseConsultationUrl } = load("src/lib/consultation/campaigns.ts");
const { consultationEmail } = load("src/lib/consultation/email.ts");
const { POST } = load("src/app/api/contact/route.ts");
const valid = {
  studentName: " John Smith ",
  phone: "+66 81 234 5678",
  preferredDate: "2099-09-15",
  preferredTime: "afternoon",
  program: "ged",
};
const qr = {
  ...valid,
  source: "qr",
  sourceId: "cafe01",
  promoCode: "EDU-12345",
  establishment: "Cafe 01",
};
const request = (body) =>
  new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

test("normal and QR context, optional fields, normalized international phones", () => {
  for (const phone of ["+66 81 234 5678", "081-234-5678", "+959123456789"]) {
    const result = validateConsultation({ ...valid, phone }, "2026-09-08");
    assert.equal(result.ok, true);
    assert.equal(result.value.studentName, "John Smith");
    assert.equal(result.value.campaign, null);
  }
  assert.equal(parseConsultationUrl(new URLSearchParams()).requested, false);
  for (const query of [
    "consultation=1&source=cafe01",
    "consultation=1&source=cafe01&promo=EDU-12345",
    "consultation=1&source=cafe01&promo=a&promo=b",
  ]) {
    const context = parseConsultationUrl(new URLSearchParams(query));
    assert.equal(context.invalid, false);
    assert.deepEqual(context.campaign, {
      source: "qr",
      sourceId: "cafe01",
      establishment: "Cafe 01",
    });
  }
  for (const query of [
    "consultation=1",
    "consultation=1&source=unknown-source&promo=EDU-12345",
    "consultation=1&source=toString&promo=EDU-12345",
    "consultation=1&source=cafe01&source=cafe01",
  ]) {
    assert.equal(
      parseConsultationUrl(new URLSearchParams(query)).invalid,
      true,
    );
  }
});

test("reject malformed shapes, past/impossible dates, invalid contacts, enums and campaigns", () => {
  for (const input of [
    null,
    [],
    "hello",
    { ...valid, studentName: [] },
    { ...valid, notes: "a".repeat(2001) },
    { ...valid, phone: "abc" },
    { ...valid, email: "bad@email" },
    { ...valid, email: "x@example.com\r\nBcc: x@example.com" },
    { ...valid, preferredDate: "2026-09-07" },
    { ...valid, preferredDate: "2099-02-30" },
    { ...valid, preferredTime: "midnight" },
    { ...valid, program: "toString" },
    { ...qr, sourceId: "unknown" },
    { ...qr, establishment: "Attacker subject" },
    { ...qr, promoCode: "<b>promo</b>" },
    { ...qr, promoCode: "" },
    { ...valid, promoCode: "<b>promo</b>" },
    { ...valid, promoCode: "a".repeat(65) },
  ]) {
    assert.equal(
      validateConsultation(input, "2026-09-08").ok,
      false,
      JSON.stringify(input),
    );
  }
  assert.equal(
    validateConsultation(
      { ...valid, preferredDate: "2026-09-08" },
      "2026-09-08",
    ).ok,
    true,
  );
  assert.equal(pattayaToday(new Date("2026-09-07T18:00:00Z")), "2026-09-08");
  assert.equal(localToday(new Date(2026, 8, 8, 0, 1)), "2026-09-08");
});

test("readable subjects and escaped email content", () => {
  const normal = consultationEmail(
    validateConsultation(valid, "2026-09-08").value,
  );
  assert.equal(normal.subject, "New Book Consultation - ELS Pattaya");
  assert.match(normal.text, /Source: Website/);
  assert.match(normal.text, /Guardian Name: Not provided/);
  const email = consultationEmail(
    validateConsultation(
      { ...qr, notes: '<img src=x onerror="alert(1)">\nNext line' },
      "2026-09-08",
    ).value,
  );
  assert.equal(email.subject, "Cafe 01 - Book Consultation");
  for (const label of [
    "Cafe 01",
    "EDU-12345",
    "QR Code",
    "September 15, 2099",
    "Afternoon",
    "GED Preparation",
  ])
    assert.ok(email.text.includes(label));
  assert.ok(!email.html.includes("<img"));
  assert.match(email.html, /&lt;img/);
});

test("API validates before sending, sends both flows, hides thrown provider failures", async () => {
  process.env.RESEND_API_KEY = "test-only";
  process.env.CONTACT_SENDER_EMAIL = "Test <test@example.com>";
  process.env.CONTACT_RECEIVER_EMAIL = "test@example.com";
  for (const body of [
    null,
    { ...valid, phone: "bad" },
    { ...valid, email: "bad" },
    { ...valid, preferredDate: "2000-01-01" },
    { ...qr, sourceId: "unknown" },
  ])
    assert.equal((await POST(request(body))).status, 400);
  assert.equal(sent.length, 0);
  assert.equal((await POST(request(valid))).status, 200);
  assert.equal(sent[0].subject, "New Book Consultation - ELS Pattaya");
  assert.equal(sent[0].replyTo, undefined);
  assert.equal(
    (await POST(request({ ...qr, email: "john@example.com" }))).status,
    200,
  );
  assert.equal(sent[1].subject, "Cafe 01 - Book Consultation");
  assert.equal(sent[1].replyTo, "john@example.com");
  assert.equal(
    (await POST(request({ ...valid, source: "website", promoCode: " MANUAL-10 " }))).status,
    200,
  );
  assert.match(sent[2].text, /Promo Code: MANUAL-10/);
  assert.match(sent[2].html, /MANUAL-10/);
  assert.match(sent[2].text, /Source: Website/);
  assert.equal(
    (await POST(request({ ...qr, promoCode: "EDITED-20" }))).status,
    200,
  );
  assert.match(sent[3].text, /Promo Code: EDITED-20/);
  assert.equal(sent[3].subject, "Cafe 01 - Book Consultation");
  assert.equal((await POST(request({ notes: "a".repeat(17000) }))).status, 413);
  assert.equal(
    (
      await POST(
        new Request("http://localhost", { method: "POST", body: "{}" }),
      )
    ).status,
    415,
  );
  assert.equal(
    (
      await POST(
        new Request("http://localhost", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: "{",
        }),
      )
    ).status,
    400,
  );
  providerFailure = true;
  const originalError = console.error;
  console.error = () => {};
  try {
    const response = await POST(request(valid));
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), {
      message: "We couldn't send your consultation request. Please try again.",
    });
  } finally {
    console.error = originalError;
  }
});
