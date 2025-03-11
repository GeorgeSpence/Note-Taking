/*
  Warnings:

  - Added the required column `body` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Note` ADD COLUMN `body` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
