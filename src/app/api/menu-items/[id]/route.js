import prisma from "@/libs/prismaConnect";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import UserInfo from "@/models/UserInfo";

export async function PUT(req, context) {
  const session = await getServerSession(authOptions);
  const targetItemId = context.params.id;

  // if the currnet user is an admin
  if (session.user.isAdmin) {
    const body = await req.json();
    console.log("body", body);

    const currentItem = await prisma.item.findUnique({
      where: { id: targetItemId },
    });

    const updatedItem = await prisma.item.update({
      where: { id: targetItemId },
      data: {
        name: body.name ? body.name : currentItem.name,
        price: body.price ? parseInt(body.price) : currentItem.price,
        location: {
          connect: {
            id: body.location,
          },
        },
      },
    });
    return Response.json({ item: updatedItem });
  }

  return Response.json({ item: "error" });
}

export async function GET(req, context) {
  const { id } = context.params;
  console.log("target id", id);

  const item = await prisma.item.findUnique({
    where: {
      id,
    },
    // select: {
    // id: true,
    // isDasher: true,
    // isAdmin: true,
    // name: true,
    // phone: true,
    // dorm: true,
    // roomNumber: true
    // },
  });

  return Response.json({ item });
}

export async function DELETE(req, context) {
  const session = await getServerSession(authOptions);
  const targetItemId = context.params.id;

  // if the currnet user is an admin
  if (session.user.isAdmin) {
    const deletedItem = await prisma.item.delete({
      where: { id: targetItemId },
    });

    return Response.json({ status: "success" });
  }

  return Response.json({ user: "error" });
}
