# Consultation promo codes

Open `/?consultation=1&qrpromo=1` to show the promo consultation form. Apply checks the code and displays its venue. Applying does not reserve or consume a code. The server checks it again at submission; only one consultation can redeem it.

The normal Book consultation button opens the form without promo fields. Legacy `?consultation=1&source=cafe1` links still open a normal form; source and venue are no longer taken from the URL. Query flags are removed after opening, and closing then reopening via the button starts a normal consultation.

## Deployment and CMS setup

1. Run `npm run cms:migrate` against the intended deployment database before serving this version. The migration adds tables and indexes without altering existing content.
2. In Payload admin, open **Consultations → Venues**. Create an active venue.
3. Open **Promo Codes**. Create one or more unique codes and select their venue. Codes are trimmed and uppercased. Both the code and venue must be active.
4. Distribute codes separately from the common QR URL. Test codes on a development database: a successful submission permanently consumes the code.

Code identifiers and venue assignments cannot be edited after creation. Disable an unused code to retire it and create a replacement. Codes, venues, and consultation requests cannot be deleted through the CMS/API, so usage history is retained. Existing hardcoded cafe names are not automatically seeded; create the actual venues and codes in CMS.

## Accepted requests and email

All consultation requests, including ordinary website requests, are saved to **Consultation Requests**. This version requires the CMS database for submission.

A request's immutable promo/venue snapshot is the email source of truth. Request creation and the promo's `usedAt` update share a transaction. Unique database indexes on the redeemed promo and promo-code snapshot prevent concurrent reuse. A request UUID makes retries of the same submission idempotent.

Email is sent after the transaction commits. A provider failure does not undo the booking or free the code. The request remains accepted, with notification status **failed** (or **pending** if delivery/status persistence was interrupted). To retry, check **Retry Notification** on the saved request and save. Already-sent notifications are skipped. Resend receives the same idempotency key on retries.

Configure `RESEND_API_KEY`, `CONTACT_SENDER_EMAIL`, and `CONTACT_RECEIVER_EMAIL` for email delivery. No automatic background email retry worker is included; pending/failed notifications can be filtered and retried in CMS.

## Verification

```sh
node --test tests/consultation.test.mjs
npx tsc --noEmit
npm run lint
```

The integration test creates fixtures and must use an isolated PostgreSQL database, never production. Migrate that database first. Explicitly set both database variables to the same test URL:

```sh
DATABASE_URL="$CONSULTATION_TEST_DATABASE_URL" npm run cms:migrate
NODE_ENV=production DATABASE_URL="$CONSULTATION_TEST_DATABASE_URL" npx payload run tests/consultation.integration.ts
```

Export `CONSULTATION_TEST_DATABASE_URL` and a test `PAYLOAD_SECRET` before running these commands. The test mocks outgoing HTTP/email and covers simultaneous redemption, idempotency, transaction rollback, inactive venues/codes, normalization, API validation, notification retry, and access controls. Fixtures remain in the isolated database until it is discarded.
