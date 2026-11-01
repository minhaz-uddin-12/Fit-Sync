CREATE TYPE "public"."booking_status" AS ENUM('pending', 'confirmed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."message_status" AS ENUM('new', 'read');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'paid');--> statement-breakpoint
CREATE TYPE "public"."plan" AS ENUM('Drop-In', 'Unlimited', 'Premium');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('member', 'trainer', 'admin');--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"trainer_id" uuid NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"duration" integer NOT NULL,
	"status" "booking_status" DEFAULT 'pending' NOT NULL,
	"notes" varchar(500),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "bookings_duration_range" CHECK ("bookings"."duration" between 30 and 120)
);
--> statement-breakpoint
CREATE TABLE "exercises" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workout_id" uuid NOT NULL,
	"position" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"sets" integer NOT NULL,
	"reps" integer NOT NULL,
	"weight" real DEFAULT 0 NOT NULL,
	CONSTRAINT "exercises_sets_positive" CHECK ("exercises"."sets" > 0),
	CONSTRAINT "exercises_reps_positive" CHECK ("exercises"."reps" > 0)
);
--> statement-breakpoint
CREATE TABLE "memberships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"plan" "plan" NOT NULL,
	"price" integer NOT NULL,
	"months" integer NOT NULL,
	"start_date" timestamp with time zone DEFAULT now() NOT NULL,
	"end_date" timestamp with time zone NOT NULL,
	"payment_status" "payment_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(80) NOT NULL,
	"email" varchar(255) NOT NULL,
	"subject" varchar(120) NOT NULL,
	"message" varchar(2000) NOT NULL,
	"status" "message_status" DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"role" "role" DEFAULT 'member' NOT NULL,
	"phone" varchar(20),
	"title" varchar(80),
	"bio" varchar(500),
	"specialties" text[] DEFAULT '{}'::text[] NOT NULL,
	"image" text,
	"reset_token_hash" text,
	"reset_token_expires" timestamp with time zone,
	"last_login" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workouts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" varchar(100) NOT NULL,
	"duration" integer NOT NULL,
	"calories" integer DEFAULT 0 NOT NULL,
	"notes" varchar(500),
	"date" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "workouts_duration_positive" CHECK ("workouts"."duration" > 0),
	CONSTRAINT "workouts_calories_non_negative" CHECK ("workouts"."calories" >= 0)
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_trainer_id_users_id_fk" FOREIGN KEY ("trainer_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_workout_id_workouts_id_fk" FOREIGN KEY ("workout_id") REFERENCES "public"."workouts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "bookings_trainer_date_idx" ON "bookings" USING btree ("trainer_id","date");--> statement-breakpoint
CREATE INDEX "bookings_user_date_idx" ON "bookings" USING btree ("user_id","date");--> statement-breakpoint
CREATE INDEX "exercises_workout_idx" ON "exercises" USING btree ("workout_id","position");--> statement-breakpoint
CREATE UNIQUE INDEX "memberships_user_unique" ON "memberships" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_unique" ON "users" USING btree (lower("email"));--> statement-breakpoint
CREATE INDEX "users_role_idx" ON "users" USING btree ("role");--> statement-breakpoint
CREATE INDEX "workouts_user_date_idx" ON "workouts" USING btree ("user_id","date");