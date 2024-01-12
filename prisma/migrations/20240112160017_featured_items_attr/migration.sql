-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "image" TEXT,
    "price" TEXT NOT NULL DEFAULT '5',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Item_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("_id", "image", "locationId", "name", "price") SELECT "_id", "image", "locationId", "name", "price" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
