import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_consultation_requests_preferred_time" AS ENUM('09:00-10:00', '10:00-11:00', '11:00-12:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00');
  CREATE TYPE "public"."enum_consultation_requests_program" AS ENUM('ged', 'language', 'academic', 'other');
  CREATE TYPE "public"."enum_consultation_requests_source" AS ENUM('website', 'qr');
  CREATE TYPE "public"."enum_consultation_requests_notification_status" AS ENUM('pending', 'sent', 'failed');
  CREATE TABLE "venues" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"active" boolean DEFAULT true NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "promo_codes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar NOT NULL,
  	"venue_id" integer NOT NULL,
  	"active" boolean DEFAULT true NOT NULL,
  	"used_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "consultation_requests" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"request_key" varchar NOT NULL,
  	"student_name" varchar NOT NULL,
  	"guardian_name" varchar,
  	"phone" varchar NOT NULL,
  	"email" varchar,
  	"preferred_date" varchar NOT NULL,
  	"preferred_time" "enum_consultation_requests_preferred_time" NOT NULL,
  	"program" "enum_consultation_requests_program" NOT NULL,
  	"notes" varchar,
  	"source" "enum_consultation_requests_source" NOT NULL,
  	"promo_id" integer,
  	"promo_code" varchar,
  	"venue_id" integer,
  	"establishment" varchar,
  	"notification_status" "enum_consultation_requests_notification_status" DEFAULT 'pending' NOT NULL,
  	"notified_at" timestamp(3) with time zone,
  	"retry_notification" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "venues_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "promo_codes_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "consultation_requests_id" integer;
  ALTER TABLE "promo_codes" ADD CONSTRAINT "promo_codes_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "consultation_requests" ADD CONSTRAINT "consultation_requests_promo_id_promo_codes_id_fk" FOREIGN KEY ("promo_id") REFERENCES "public"."promo_codes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "consultation_requests" ADD CONSTRAINT "consultation_requests_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "venues_updated_at_idx" ON "venues" USING btree ("updated_at");
  CREATE INDEX "venues_created_at_idx" ON "venues" USING btree ("created_at");
  CREATE UNIQUE INDEX "promo_codes_code_idx" ON "promo_codes" USING btree ("code");
  CREATE INDEX "promo_codes_venue_idx" ON "promo_codes" USING btree ("venue_id");
  CREATE INDEX "promo_codes_updated_at_idx" ON "promo_codes" USING btree ("updated_at");
  CREATE INDEX "promo_codes_created_at_idx" ON "promo_codes" USING btree ("created_at");
  CREATE UNIQUE INDEX "consultation_requests_request_key_idx" ON "consultation_requests" USING btree ("request_key");
  CREATE UNIQUE INDEX "consultation_requests_promo_idx" ON "consultation_requests" USING btree ("promo_id");
  CREATE UNIQUE INDEX "consultation_requests_promo_code_idx" ON "consultation_requests" USING btree ("promo_code");
  CREATE INDEX "consultation_requests_venue_idx" ON "consultation_requests" USING btree ("venue_id");
  CREATE INDEX "consultation_requests_updated_at_idx" ON "consultation_requests" USING btree ("updated_at");
  CREATE INDEX "consultation_requests_created_at_idx" ON "consultation_requests" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_venues_fk" FOREIGN KEY ("venues_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_promo_codes_fk" FOREIGN KEY ("promo_codes_id") REFERENCES "public"."promo_codes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_consultation_requests_fk" FOREIGN KEY ("consultation_requests_id") REFERENCES "public"."consultation_requests"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_venues_id_idx" ON "payload_locked_documents_rels" USING btree ("venues_id");
  CREATE INDEX "payload_locked_documents_rels_promo_codes_id_idx" ON "payload_locked_documents_rels" USING btree ("promo_codes_id");
  CREATE INDEX "payload_locked_documents_rels_consultation_requests_id_idx" ON "payload_locked_documents_rels" USING btree ("consultation_requests_id");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "venues" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "promo_codes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "consultation_requests" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_venues_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_promo_codes_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_consultation_requests_fk";
  
  DROP INDEX "payload_locked_documents_rels_venues_id_idx";
  DROP INDEX "payload_locked_documents_rels_promo_codes_id_idx";
  DROP INDEX "payload_locked_documents_rels_consultation_requests_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "venues_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "promo_codes_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "consultation_requests_id";
  DROP TABLE "consultation_requests";
  DROP TABLE "promo_codes";
  DROP TABLE "venues";
  DROP TYPE "public"."enum_consultation_requests_preferred_time";
  DROP TYPE "public"."enum_consultation_requests_program";
  DROP TYPE "public"."enum_consultation_requests_source";
  DROP TYPE "public"."enum_consultation_requests_notification_status";`);
}
