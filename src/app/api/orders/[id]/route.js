import { PrismaClient } from "@prisma/client";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import UserInfo from "@/models/UserInfo";

// export async function PUT(req, context) {
//   const prisma = new PrismaClient();
//   const session = await getServerSession(authOptions);
//   const targetItemId = context.params.id;

//   // if the currnet user is an admin
//   if (session.user.isAdmin) {
//     const body = await req.json();
//     console.log("body", body);

//     const currentItem = await prisma.item.findUnique({
//       where: { id: targetItemId },
//     });

//     const updatedItem = await prisma.item.update({
//       where: { id: targetItemId },
//       data: {
//         name: body.name ? body.name : currentItem.name,
//         price: body.price ? parseInt(body.price) : currentItem.price,
//         location: {
//           connect: {
//             id: body.location,
//           },
//         },
//       },
//     });
//     return Response.json({ item: updatedItem });
//   }

//   prisma.$disconnect();
//   return Response.json({ item: "error" });
// }
//
export async function PATCH(req, context) {
  const { id } = context.params;

  const body = await req.json();
  const prisma = new PrismaClient();
  const order = await prisma.order.update({
    where: { id },
    data: {
      paid: body.paid,
    },
    select: {
      userId: true,
      locationId: true,
      price: true,
      location: true,
      items: true,
      destinationDorm: true,
      destinationRoom: true,
      phone: true,
      user: true,
      paid: true,
    },
  });
  prisma.$disconnect();

  return Response.json({ order });
}

export async function GET(req, context) {
  const { id } = context.params;
  // console.log("target id", id);

  const prisma = new PrismaClient();
  const order = await prisma.order.findUnique({
    where: {
      id,
    },
    select: {
      userId: true,
      locationId: true,
      price: true,
      location: true,
      items: true,
      destinationDorm: true,
      destinationRoom: true,
      phone: true,
      user: true,
      paid: true,
      dasher: true,
    },
  });
  prisma.$disconnect();

  return Response.json({ order });
}

// export async function DELETE(req, context) {
//   const prisma = new PrismaClient();
//   const session = await getServerSession(authOptions);
//   const targetItemId = context.params.id;

//   // if the currnet user is an admin
//   if (session.user.isAdmin) {
//     const deletedItem = await prisma.item.delete({
//       where: { id: targetItemId },
//     });

//     return Response.json({ status: "success" });
//   }

//   prisma.$disconnect();
//   return Response.json({ user: "error" });
// }
