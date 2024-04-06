/*
  Warnings:

  - You are about to drop the column `report_date` on the `BugReport` table. All the data in the column will be lost.
  - You are about to drop the column `solve_date` on the `BugReport` table. All the data in the column will be lost.
  - You are about to drop the column `status_code` on the `EndpointCall` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BugReport" DROP COLUMN "report_date",
DROP COLUMN "solve_date",
ADD COLUMN     "reportDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "solveDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "EndpointCall" DROP COLUMN "status_code",
ADD COLUMN     "responseBody" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "responseHeader" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "statusCode" INTEGER NOT NULL DEFAULT 200;
