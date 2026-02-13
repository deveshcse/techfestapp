-- CreateEnum
CREATE TYPE "ActivityStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('WORKSHOP', 'CODING', 'ROBOTICS', 'TALK', 'CULTURAL', 'OTHER');

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "techfestId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "type" "ActivityType" NOT NULL DEFAULT 'OTHER',
    "rules" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "startDateTime" TIMESTAMP(3) NOT NULL,
    "endDateTime" TIMESTAMP(3) NOT NULL,
    "capacity" INTEGER DEFAULT 100,
    "status" "ActivityStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT,
    "organizedById" TEXT,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Activity_techfestId_idx" ON "Activity"("techfestId");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_techfestId_fkey" FOREIGN KEY ("techfestId") REFERENCES "tech_fest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_organizedById_fkey" FOREIGN KEY ("organizedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
