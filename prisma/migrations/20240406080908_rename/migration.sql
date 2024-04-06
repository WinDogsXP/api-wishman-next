-- AlterTable
ALTER TABLE "App" ADD COLUMN     "hours" INTEGER NOT NULL DEFAULT 12;

-- AlterTable
ALTER TABLE "BugReport" ADD COLUMN     "receiver" TEXT,
ALTER COLUMN "solve_date" DROP NOT NULL;
