import prisma from "@/libs/prismaConnect";
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

  // for updating an orders paid value
  if (body.paid) {
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
        OrderStatus: true,
        dasher: true,
        dasherId: true,
      },
    });

    return Response.json({ order });
  }
  // for updating the status of an item
  if (body.statusId) {
    const data = {};

    data[body.type] = new Date();
    const status = await prisma.OrderStatus.update({
      where: { id: body.statusId },
      data: { ...data },
    });

    return Response.json({ status });
  }
}

export async function GET(req, context) {
  const { id } = context.params;
  // console.log("target id", id);

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
      OrderStatus: true,
    },
  });

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
