CREATE TYPE "public"."action" AS ENUM('DELETE_USER', 'LOGIN', 'REGISTRATION');--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp (3) DEFAULT CURRENT_TIMESTAMP(3),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "refresh_tokens" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"code" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "verification_tokens" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"pin" varchar(6) NOT NULL,
	"action" "action",
	"expires" timestamp NOT NULL,
	"email" varchar(320) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "rt_user_id_code_idx" ON "refresh_tokens" USING btree ("user_id","code");--> statement-breakpoint
CREATE INDEX "vt_email_action_idx" ON "verification_tokens" USING btree ("email","action");--> statement-breakpoint
CREATE INDEX "vt_email_idx" ON "verification_tokens" USING btree ("email");