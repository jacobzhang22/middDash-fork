import prisma from "@/libs/prismaConnect";
// import { PrismaClient } from "@prisma/client/edge";
// import mongoose from "mongoose";

// export async function POST(req) {
//   mongoose.connect(process.env.MONGO_URL);
//   const data = await req.json();
//   const menuItemDoc = await MenuItem.create(data);
//   return Response.json(menuItemDoc);
// }

// export async function PUT(req) {
//   mongoose.connect(process.env.MONGO_URL);
//   const { _id, ...data } = await req.json();
//   await MenuItem.findByIdAndUpdate(_id, data);
//   return Response.json(true);
// }

// eslint-disable-next-line import/prefer-default-export
export async function GET() {
  const allItems = await prisma.item.findMany({
    where: { featured: true },
  });

  // mongoose.connect(process.env.MONGO_URL);
  return Response.json(allItems);
}

// export async function DELETE(req) {
//   mongoose.connect(process.env.MONGO_URL);
//   const url = new URL(req.url);
//   const _id = url.searchParams.get("_id");
//   await MenuItem.deleteOne({ _id });
//   return Response.json(true);
// }
