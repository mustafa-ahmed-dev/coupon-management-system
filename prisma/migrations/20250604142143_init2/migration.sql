/*
  Warnings:

  - The values [support] on the enum `role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "role_new" AS ENUM ('user', 'admin', 'manager');
ALTER TABLE "users" ALTER COLUMN "role" TYPE "role_new" USING ("role"::text::"role_new");
ALTER TABLE "audit_logs" ALTER COLUMN "user_role" TYPE "role_new" USING ("user_role"::text::"role_new");
ALTER TYPE "role" RENAME TO "role_old";
ALTER TYPE "role_new" RENAME TO "role";
DROP TYPE "role_old";
COMMIT;

-- AlterTable
ALTER TABLE "coupons" ALTER COLUMN "is_used" SET DEFAULT false;
