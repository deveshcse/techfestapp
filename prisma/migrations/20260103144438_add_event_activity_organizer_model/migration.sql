/*
  Warnings:

  - You are about to drop the `program_organizer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "program_organizer" DROP CONSTRAINT "program_organizer_activityId_fkey";

-- DropForeignKey
ALTER TABLE "program_organizer" DROP CONSTRAINT "program_organizer_userId_fkey";

-- DropTable
DROP TABLE "program_organizer";

-- CreateTable
CREATE TABLE "activity_organizer" (
    "id" SERIAL NOT NULL,
    "activityId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ORGANIZER',
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_organizer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "activity_organizer_activityId_userId_key" ON "activity_organizer"("activityId", "userId");

-- AddForeignKey
ALTER TABLE "activity_organizer" ADD CONSTRAINT "activity_organizer_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_organizer" ADD CONSTRAINT "activity_organizer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
