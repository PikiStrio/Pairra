/*
  Warnings:

  - You are about to alter the column `timeStamp` on the `items` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `timeStamp` on the `orderdetails` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `timeStamp` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `timeStamp` on the `roles` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `timeStamp` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `items` MODIFY `timeStamp` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `orderdetails` MODIFY `timeStamp` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `orders` MODIFY `timeStamp` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `roles` MODIFY `timeStamp` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `timeStamp` TIMESTAMP NOT NULL,
    MODIFY `token` VARCHAR(255) NULL;
