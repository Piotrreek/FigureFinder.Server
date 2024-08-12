-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailConfirmed" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "blocked" SET DEFAULT false;
