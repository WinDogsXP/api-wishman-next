/*
  Warnings:

  - You are about to drop the column `endpointId` on the `BugReport` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "App" ALTER COLUMN "description" SET DEFAULT '';

-- AlterTable
ALTER TABLE "BugReport" DROP COLUMN "endpointId";

-- AlterTable
ALTER TABLE "EndpointCall" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Stable',
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;
