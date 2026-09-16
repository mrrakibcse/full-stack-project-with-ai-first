-- AlterTable
ALTER TABLE "users" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "needPassword" BOOLEAN DEFAULT false;

-- CreateIndex
CREATE INDEX "idx_users_is_deleted" ON "users"("isDeleted");
