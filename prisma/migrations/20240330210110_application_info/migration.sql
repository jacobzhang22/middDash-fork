/*
  Warnings:

  - You are about to drop the column `userId` on the `Application` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_userId_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "userId",
ADD COLUMN     "days" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "managementInterest" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "year" TEXT;
