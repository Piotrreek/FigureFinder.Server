-- Create PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "blocked" BOOLEAN NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Figure" (
    "id" SERIAL NOT NULL,
    "latitude" DECIMAL(5,3) NOT NULL,
    "longitude" DECIMAL(6,3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "difficulty" INTEGER NOT NULL,
    "author" TEXT,
    "owner" TEXT,
    "setupDate" DATE NOT NULL,
    "figureStatusId" INTEGER NOT NULL,
    "figureTypeId" INTEGER NOT NULL,
    "createdById" INTEGER,

    CONSTRAINT "Figure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FigureHistory" (
    "id" SERIAL NOT NULL,
    "latitude" DECIMAL(5,3) NOT NULL,
    "longitude" DECIMAL(6,3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "difficulty" INTEGER NOT NULL,
    "author" TEXT,
    "owner" TEXT,
    "setupDate" DATE NOT NULL,
    "validFrom" TIMESTAMP NOT NULL,
    "validTo" TIMESTAMP NOT NULL,
    "figureId" INTEGER NOT NULL,
    "figureStatusId" INTEGER NOT NULL,
    "changedById" INTEGER,
    "figureTypeId" INTEGER NOT NULL,

    CONSTRAINT "FigureHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FigureUser" (
    "date" DATE NOT NULL,
    "comment" TEXT,
    "userId" INTEGER NOT NULL,
    "figureId" INTEGER NOT NULL,
    "figureUserStatusId" INTEGER NOT NULL,

    CONSTRAINT "FigureUser_pkey" PRIMARY KEY ("userId","figureId","figureUserStatusId")
);

-- CreateTable
CREATE TABLE "FigureType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FigureType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FigureUserStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FigureUserStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FigureStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FigureStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Figure" ADD CONSTRAINT "Figure_figureStatusId_fkey" FOREIGN KEY ("figureStatusId") REFERENCES "FigureStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Figure" ADD CONSTRAINT "Figure_figureTypeId_fkey" FOREIGN KEY ("figureTypeId") REFERENCES "FigureType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Figure" ADD CONSTRAINT "Figure_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FigureHistory" ADD CONSTRAINT "FigureHistory_figureId_fkey" FOREIGN KEY ("figureId") REFERENCES "Figure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FigureHistory" ADD CONSTRAINT "FigureHistory_figureStatusId_fkey" FOREIGN KEY ("figureStatusId") REFERENCES "FigureStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FigureHistory" ADD CONSTRAINT "FigureHistory_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FigureHistory" ADD CONSTRAINT "FigureHistory_figureTypeId_fkey" FOREIGN KEY ("figureTypeId") REFERENCES "FigureType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FigureUser" ADD CONSTRAINT "FigureUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FigureUser" ADD CONSTRAINT "FigureUser_figureId_fkey" FOREIGN KEY ("figureId") REFERENCES "Figure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FigureUser" ADD CONSTRAINT "FigureUser_figureUserStatusId_fkey" FOREIGN KEY ("figureUserStatusId") REFERENCES "FigureUserStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Add Difficulty constraint to be in range (1,5)
ALTER TABLE "Figure" ADD CONSTRAINT "value_range_check" CHECK ("difficulty" >= 1 AND "difficulty" <= 5);

-- Add Difficulty constraint to be in range (1,5)
ALTER TABLE "FigureHistory"ADD CONSTRAINT "value_range_check" CHECK ("difficulty" >= 1 AND "difficulty" <= 5);

-- Seed Role Table
INSERT INTO "Role" (name) VALUES 
('User'),
('Administrator'),
('Moderator');

-- Seed FigureType Table
INSERT INTO "FigureType" (name) VALUES
('Wrocławskie Krasnale');

-- Seed FigureUserStatus Table
INSERT INTO "FigureUserStatus" (name) VALUES
('Znaleziony'),
('Nieznaleziony');

-- Seed FigureStatus Table
INSERT INTO "FigureStatus" (name) VALUES
('Planowany'),
('Na miejscu'),
('Usunięty'),
('W renowacji');