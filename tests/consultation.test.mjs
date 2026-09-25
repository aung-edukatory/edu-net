import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// Exercise the real TypeScript modules without adding a test framework.
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
const { readRequestBody } = load("src/lib/consultation/request-body.ts");
const valid = {
  studentName: " John Smith ",
  phone: "+66 81 234 5678",
  preferredDate: "2099-09-15",
  preferredTime: "13:00-14:00",
  requestKey: "14d5926d-74e7-4387-94f9-f8be3a78eec1",
  program: "ged",
};
const qr = {
  ...valid,
  source: "qr",
  promoCode: "EDU-12345",
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
  const enabled = parseConsultationUrl(
    new URLSearchParams("consultation=1&qrpromo=1"),
  );
  assert.deepEqual(enabled, { requested: true, qrPromo: true });
  for (const query of [
    "consultation=1",
    "consultation=1&source=cafe1",
    "qrpromo=1",
    "consultation=1&qrpromo=0",
    "consultation=1&qrpromo=1&qrpromo=1",
    "consultation=1&consultation=1&qrpromo=1",
  ])
    assert.equal(
      parseConsultationUrl(new URLSearchParams(query)).qrPromo,
      false,
    );
  const normalized = validateConsultation(
    { ...qr, promoCode: " edu-12345 " },
    "2026-09-08",
  );
  assert.equal(normalized.ok, true);
  assert.equal(normalized.value.promoCode, "EDU-12345");
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
    { ...valid, requestKey: "bad" },
    { ...valid, requestKey: "" },
    { ...valid, promoCode: "QR-ONLY" },
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
  const email = consultationEmail({
    ...validateConsultation(
      { ...qr, notes: '<img src=x onerror="alert(1)">\nNext line' },
      "2026-09-08",
    ).value,
    campaign: { source: "qr", sourceId: "1", establishment: "Cafe 01" },
  });
  assert.equal(email.subject, "Cafe 01 - Book Consultation");
  for (const label of [
    "Cafe 01",
    "EDU-12345",
    "QR Code",
    "September 15, 2099",
    "1:00 PM - 2:00 PM",
    "GED Preparation",
  ])
    assert.ok(email.text.includes(label));
  assert.ok(!email.html.includes("<img"));
  assert.match(email.html, /&lt;img/);
});

test("request parser bounds the body and rejects unsupported or malformed input", async () => {
  assert.deepEqual(await readRequestBody(request(valid)), { body: valid });
  assert.equal(
    (await readRequestBody(request({ notes: "a".repeat(17000) }))).response
      .status,
    413,
  );
  assert.equal(
    (
      await readRequestBody(
        new Request("http://localhost", { method: "POST", body: "{}" }),
      )
    ).response.status,
    415,
  );
  assert.equal(
    (
      await readRequestBody(
        new Request("http://localhost", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: "{",
        }),
      )
    ).response.status,
    400,
  );
});
