# ELS Content Manager

Payload CMS manages the homepage GED Graduates, Choose Your Course, School
Updates and Study Tips, and partner-logo sections. The public site keeps the
existing layouts and reads published records from Payload.

## Local setup

1. Copy `.env.example` to `.env.local` and set `DATABASE_URL`, `PAYLOAD_SECRET`,
   and `NEXT_PUBLIC_SERVER_URL`.
2. Run `npm run cms:migrate` to apply committed database migrations.
3. Run `npm run cms:seed` once to import existing site content into an empty
   database. The seed is safe to run again because it skips non-empty content
   collections.
4. Run `npm run dev` and open `/admin`.

Use `npm run cms:check` to verify database connectivity and record counts.
After changing collection schemas, regenerate types with
`npm run cms:generate-types`, create a migration with
`npm run cms:migrate:create -- migration-name`, and apply it with
`npm run cms:migrate`.

## Publishing behavior

Visitors can read published records only. Authenticated staff can create,
update, publish, unpublish, and delete content in the admin panel. Public pages
fall back to the original site content when a CMS collection is empty or the
database is temporarily unavailable.

## Deployment

Set all environment variables on the hosting platform. For serverless or
IPv4-only hosting, use Supabase's Supavisor connection string instead of the
direct IPv6 database URL.

Development uploads currently use local storage. Before production deployment,
configure persistent object storage and migrate the seeded media files; a
serverless filesystem will not retain new uploads.
