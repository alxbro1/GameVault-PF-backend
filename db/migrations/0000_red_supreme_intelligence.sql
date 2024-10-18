CREATE TYPE roleEnum AS ENUM ('CUSTOMER', 'ADMIN', 'PROVIDER', 'OWNER');

CREATE TABLE IF NOT EXISTS "credentials" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "password" varchar NOT NULL,
    "email" varchar NOT NULL,
    "user_id" uuid,
    CONSTRAINT "credentials_password_unique" UNIQUE("password"),
    CONSTRAINT "credentials_email_unique" UNIQUE("email")
);

CREATE TABLE IF NOT EXISTS "users" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "fullname" varchar(25) NOT NULL,
    "role" roleEnum NOT NULL,
    "phone" integer NOT NULL
);


DO $$ 
BEGIN
    ALTER TABLE "credentials" 
    ADD CONSTRAINT "credentials_user_id_users_id_fk" 
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
EXCEPTION
    WHEN duplicate_object THEN 
        NULL;
END $$;
