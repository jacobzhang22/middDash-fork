import { PrismaClient } from '@prisma/client';
import mongoose from "mongoose";
import MenuItem from '../../../models/MenuItem';

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const menuItemDoc = await MenuItem.create(data);
  return Response.json(menuItemDoc);
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { _id, ...data } = await req.json();
  await MenuItem.findByIdAndUpdate(_id, data);
  return Response.json(true);
}

export async function GET() {
  const prisma = new PrismaClient();

  const allItems = await prisma.location.findMany({
    include: {
      items: true,
    },
  });

  await prisma.$disconnect();
  // mongoose.connect(process.env.MONGO_URL);
  return Response.json(allItems);
}

// export async function DELETE(req) {
  // const prisma = new PrismaClient()

  // const url = new URL(req.url);
  // const _id = url.searchParams.get("_id");
  // // await MenuItem.deleteOne({ _id });
  // await prisma.item.delete()

  // await prisma.$disconnect()
  // return Response.json(true);
// }
