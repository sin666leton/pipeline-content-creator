/*
  Warnings:

  - Added the required column `user_id` to the `content_checklists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `content_checklists` ADD COLUMN `user_id` BIGINT NOT NULL;

-- CreateIndex
CREATE INDEX `fk_checklists_user` ON `content_checklists`(`user_id`);

-- AddForeignKey
ALTER TABLE `content_checklists` ADD CONSTRAINT `content_checklists_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
