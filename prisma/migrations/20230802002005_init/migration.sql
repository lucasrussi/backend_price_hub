/*
  Warnings:

  - Added the required column `cityId` to the `Market` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `market` ADD COLUMN `cityId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Market` ADD CONSTRAINT `Market_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
