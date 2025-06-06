-- CreateEnum
CREATE TYPE "role" AS ENUM ('user', 'admin', 'manager');

-- CreateEnum
CREATE TYPE "CouponType" AS ENUM ('percentage', 'fixed');

-- CreateEnum
CREATE TYPE "coupon_approval_status" AS ENUM ('pending', 'approved', 'rejected');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "username" VARCHAR(25) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" CHAR(97) NOT NULL,
    "role" "role" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "refresh_token" VARCHAR(512),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login" TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupons" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(25) NOT NULL,
    "amount" MONEY NOT NULL,
    "is_used" BOOLEAN NOT NULL DEFAULT false,
    "type" "CouponType" NOT NULL DEFAULT 'fixed',
    "created_by_id" INTEGER NOT NULL,
    "created_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_date" TIMESTAMP,

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupon_request_categories" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(512),

    CONSTRAINT "coupon_request_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "issues" (
    "id" SERIAL NOT NULL,
    "order_number" INTEGER NOT NULL,
    "customer_name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(512) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "coupon_id" INTEGER,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "issues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupon_request_approvals" (
    "id" SERIAL NOT NULL,
    "request_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status" "coupon_approval_status" NOT NULL DEFAULT 'pending',
    "decision_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" VARCHAR(512) NOT NULL,

    CONSTRAINT "coupon_request_approvals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" UUID NOT NULL,
    "action" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "user_role" "role" NOT NULL,
    "timestamp" TIMESTAMP NOT NULL,
    "details" TEXT NOT NULL,
    "ip_address" VARCHAR(45) NOT NULL,
    "user_agent" VARCHAR(255),
    "device" VARCHAR(100),
    "location" VARCHAR(100),

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_name_idx" ON "users"("name");

-- CreateIndex
CREATE INDEX "users_is_active_idx" ON "users"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "coupons_code_key" ON "coupons"("code");

-- CreateIndex
CREATE INDEX "coupons_assigned_date_idx" ON "coupons"("assigned_date");

-- CreateIndex
CREATE INDEX "coupons_amount_idx" ON "coupons"("amount");

-- CreateIndex
CREATE INDEX "coupons_is_used_idx" ON "coupons"("is_used");

-- CreateIndex
CREATE UNIQUE INDEX "coupon_request_categories_name_key" ON "coupon_request_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "issues_coupon_id_key" ON "issues"("coupon_id");

-- CreateIndex
CREATE INDEX "issues_user_id_idx" ON "issues"("user_id");

-- CreateIndex
CREATE INDEX "coupon_request_approvals_request_id_idx" ON "coupon_request_approvals"("request_id");

-- CreateIndex
CREATE INDEX "coupon_request_approvals_user_id_idx" ON "coupon_request_approvals"("user_id");

-- AddForeignKey
ALTER TABLE "coupons" ADD CONSTRAINT "coupons_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "coupons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "coupon_request_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon_request_approvals" ADD CONSTRAINT "coupon_request_approvals_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "issues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon_request_approvals" ADD CONSTRAINT "coupon_request_approvals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
