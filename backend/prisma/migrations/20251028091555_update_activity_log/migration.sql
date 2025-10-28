/*
  Warnings:

  - Added the required column `category` to the `ActivityLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `ActivityLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActivityLog" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;
