/*
  Warnings:

  - You are about to drop the column `status` on the `EndpointCall` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BugReport" DROP CONSTRAINT "BugReport_endpointId_fkey";

-- DropForeignKey
ALTER TABLE "Endpoint" DROP CONSTRAINT "Endpoint_appId_fkey";

-- DropForeignKey
ALTER TABLE "EndpointCall" DROP CONSTRAINT "EndpointCall_endpointId_fkey";

-- AlterTable
ALTER TABLE "Endpoint" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Stable';

-- AlterTable
ALTER TABLE "EndpointCall" DROP COLUMN "status";

-- AddForeignKey
ALTER TABLE "Endpoint" ADD CONSTRAINT "Endpoint_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EndpointCall" ADD CONSTRAINT "EndpointCall_endpointId_fkey" FOREIGN KEY ("endpointId") REFERENCES "Endpoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BugReport" ADD CONSTRAINT "BugReport_endpointId_fkey" FOREIGN KEY ("endpointId") REFERENCES "Endpoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;
