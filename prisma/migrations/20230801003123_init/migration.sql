/*
  Warnings:

  - You are about to drop the column `estabId` on the `marketestab` table. All the data in the column will be lost.
  - Added the required column `cityId` to the `MarketEstab` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marketId` to the `MarketEstab` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `MarketEstab` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `marketestab` DROP FOREIGN KEY `MarketEstab_estabId_fkey`;

-- AlterTable
ALTER TABLE `marketestab` DROP COLUMN `estabId`,
    ADD COLUMN `cityId` INTEGER NOT NULL,
    ADD COLUMN `marketId` INTEGER NOT NULL,
    ADD COLUMN `street` VARCHAR(2000) NOT NULL;

-- AddForeignKey
ALTER TABLE `MarketEstab` ADD CONSTRAINT `MarketEstab_marketId_fkey` FOREIGN KEY (`marketId`) REFERENCES `Market`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MarketEstab` ADD CONSTRAINT `MarketEstab_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
