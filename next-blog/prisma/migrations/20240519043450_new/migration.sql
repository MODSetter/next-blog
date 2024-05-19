/*
  Warnings:

  - Added the required column `footerlinks` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `navbarlinks` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "footerlinks" TEXT NOT NULL,
ADD COLUMN     "navbarlinks" TEXT NOT NULL;
