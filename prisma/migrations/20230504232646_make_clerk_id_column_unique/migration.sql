/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Artist_clerkId_key" ON "Artist"("clerkId");
