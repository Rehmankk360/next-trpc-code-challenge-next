/*
  Warnings:

  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Tag` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `A` on the `_PostToTag` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `B` on the `_PostToTag` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Post" ("createdAt", "id", "text", "title", "updatedAt") SELECT "createdAt", "id", "text", "title", "updatedAt" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE TABLE "new_Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL
);
INSERT INTO "new_Tag" ("id", "label") SELECT "id", "label" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
CREATE TABLE "new__PostToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__PostToTag" ("A", "B") SELECT "A", "B" FROM "_PostToTag";
DROP TABLE "_PostToTag";
ALTER TABLE "new__PostToTag" RENAME TO "_PostToTag";
CREATE UNIQUE INDEX "_PostToTag_AB_unique" ON "_PostToTag"("A", "B");
CREATE INDEX "_PostToTag_B_index" ON "_PostToTag"("B");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
