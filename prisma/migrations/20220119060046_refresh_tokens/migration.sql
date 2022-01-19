/*
  Warnings:

  - A unique constraint covering the columns `[refreshtoken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refreshtoken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_refreshtoken_key" ON "User"("refreshtoken");
