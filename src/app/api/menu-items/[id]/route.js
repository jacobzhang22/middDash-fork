import prisma from "@/libs/prismaConnect";
import { config } from "@/app/api/auth/auth";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function PUT(req, context) {
  const session = await getServerSession(config);

  if (!session.user.isAdmin) {
    return NextResponse.json({ error: "Not an admin" }, { status: 403 });
  }

  const targetItemId = context.params.id;

  // if the currnet user is an admin
  const body = await req.json();

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

export async function GET(req, context) {
  const { id } = context.params;

  const item = await prisma.item.findUnique({
    where: {
      id,
    },
  });

  return Response.json({ item });
}

export async function DELETE(req, context) {
  const session = await getServerSession(config);

  if (!session.user.isAdmin) {
    return NextResponse.json({ error: "Not an admin" }, { status: 403 });
  }

  const targetItemId = context.params.id;

  const deletedItem = await prisma.item.delete({
    where: { id: targetItemId },
  });

  return Response.json({ status: "success" });
}
