/*
  Warnings:

  - You are about to drop the `Dev` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "App" DROP CONSTRAINT "App_userId_fkey";

-- DropTable
DROP TABLE "Dev";
