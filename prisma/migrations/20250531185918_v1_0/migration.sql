/*
  Warnings:

  - You are about to drop the column `ipAddress` on the `audit_logs` table. All the data in the column will be lost.
  - Added the required column `ip_address` to the `audit_logs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CouponType" AS ENUM ('percentage', 'fixed');

-- CreateEnum
CREATE TYPE "coupon_approval_status" AS ENUM ('pending', 'approved', 'rejected');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "role" ADD VALUE 'manager';
ALTER TYPE "role" ADD VALUE 'support';

-- AlterTable
ALTER TABLE "audit_logs" DROP COLUMN "ipAddress",
ADD COLUMN     "device" VARCHAR(100),
ADD COLUMN     "ip_address" VARCHAR(45) NOT NULL,
ADD COLUMN     "location" VARCHAR(100),
ADD COLUMN     "user_agent" VARCHAR(255);

-- AlterTable
ALTER TABLE "coupon_request_categories" ADD COLUMN     "description" VARCHAR(512);

-- AlterTable
ALTER TABLE "coupons" ADD COLUMN     "type" "CouponType" NOT NULL DEFAULT 'fixed',
ALTER COLUMN "assigned_date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "issues" ADD COLUMN     "category_id" INTEGER;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "last_login" DROP NOT NULL;

-- CreateTable
CREATE TABLE "coupon_request_approvals" (
    "id" SERIAL NOT NULL,
    "request_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status" "coupon_approval_status" NOT NULL DEFAULT 'pending',
    "decision_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" VARCHAR(512),

    CONSTRAINT "coupon_request_approvals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "coupon_request_approvals_request_id_idx" ON "coupon_request_approvals"("request_id");

-- CreateIndex
CREATE INDEX "coupon_request_approvals_user_id_idx" ON "coupon_request_approvals"("user_id");

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "coupon_request_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon_request_approvals" ADD CONSTRAINT "coupon_request_approvals_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "issues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon_request_approvals" ADD CONSTRAINT "coupon_request_approvals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
