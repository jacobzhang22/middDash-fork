/*
  Warnings:

  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "OrderStatus" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "orderedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acceptedAt" DATETIME,
    "placedAt" DATETIME,
    "pickedUpAt" DATETIME,
    "deliveredAt" DATETIME,
    "orderId" TEXT NOT NULL,
    CONSTRAINT "OrderStatus_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 5,
    "destinationDorm" TEXT NOT NULL,
    "destinationRoom" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "dasherId" TEXT,
    CONSTRAINT "Order_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_dasherId_fkey" FOREIGN KEY ("dasherId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("_id", "dasherId", "destinationDorm", "destinationRoom", "locationId", "paid", "phone", "price", "userId") SELECT "_id", "dasherId", "destinationDorm", "destinationRoom", "locationId", "paid", "phone", "price", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
