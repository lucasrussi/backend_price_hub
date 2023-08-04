/*
  Warnings:

  - Added the required column `marketEstabId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marketEstabId` to the `ItemHist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `item` ADD COLUMN `marketEstabId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `itemhist` ADD COLUMN `marketEstabId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_marketEstabId_fkey` FOREIGN KEY (`marketEstabId`) REFERENCES `MarketEstab`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemHist` ADD CONSTRAINT `ItemHist_marketEstabId_fkey` FOREIGN KEY (`marketEstabId`) REFERENCES `MarketEstab`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
