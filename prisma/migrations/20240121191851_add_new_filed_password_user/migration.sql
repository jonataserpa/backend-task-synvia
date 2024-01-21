/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `role` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `dateborn` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `tasks_title_key` ON `tasks`(`title`);

-- CreateIndex
CREATE UNIQUE INDEX `users_email_key` ON `users`(`email`);
