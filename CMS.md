# ELS Content Manager

Payload CMS manages the homepage GED Graduates, Choose Your Course, School
Updates and Study Tips, partner logos, and “Why families choose Edukatory” testimonials. The public site keeps the
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

## Homepage testimonials

Use **Homepage → Testimonials** to edit the “Why families choose Edukatory”
carousel. Each entry has a name, role (for example Parent or Student), quote,
and display order (lower numbers appear first). Save drafts while editing and
publish when ready. The existing carousel layout and responsive controls are
preserved. As with the other homepage collections, the original testimonials
are displayed when no published records are available or the database fails.

For deployment, apply the committed testimonials migration with
`npm run cms:migrate` before serving the updated application. Run
`npm run cms:seed` to import the four existing testimonials if the collection is
empty; this command also seeds any other empty CMS content collections.
`npm run cms:check` now includes the testimonial count. Build with
`npm run build`, then restart the production application.
