/*
  Warnings:

  - You are about to drop the column `price` on the `coupons` table. All the data in the column will be lost.
  - Made the column `comment` on table `coupon_request_approvals` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `amount` to the `coupons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `coupons` table without a default value. This is not possible if the table is not empty.
  - Made the column `category_id` on table `issues` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "issues" DROP CONSTRAINT "issues_category_id_fkey";

-- DropIndex
DROP INDEX "coupons_price_idx";

-- AlterTable
ALTER TABLE "coupon_request_approvals" ALTER COLUMN "comment" SET NOT NULL;

-- AlterTable
ALTER TABLE "coupons" DROP COLUMN "price",
ADD COLUMN     "amount" MONEY NOT NULL,
ADD COLUMN     "created_by_id" INTEGER NOT NULL,
ALTER COLUMN "code" SET DATA TYPE VARCHAR(25);

-- AlterTable
ALTER TABLE "issues" ALTER COLUMN "category_id" SET NOT NULL;

-- CreateIndex
CREATE INDEX "coupons_assigned_date_idx" ON "coupons"("assigned_date");

-- CreateIndex
CREATE INDEX "coupons_amount_idx" ON "coupons"("amount");

-- AddForeignKey
ALTER TABLE "coupons" ADD CONSTRAINT "coupons_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "coupon_request_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
