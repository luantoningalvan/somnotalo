/*
  Warnings:

  - You are about to drop the column `published` on the `Album` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DRAFT', 'PROCESSING', 'PUBLISHED');

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "published",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'DRAFT';
