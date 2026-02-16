-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_organizedById_fkey";

-- CreateTable
CREATE TABLE "_ActivityOrganizers" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ActivityOrganizers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ActivityOrganizers_B_index" ON "_ActivityOrganizers"("B");

-- AddForeignKey
ALTER TABLE "_ActivityOrganizers" ADD CONSTRAINT "_ActivityOrganizers_A_fkey" FOREIGN KEY ("A") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityOrganizers" ADD CONSTRAINT "_ActivityOrganizers_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
