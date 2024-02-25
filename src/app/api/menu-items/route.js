import prisma from "@/libs/prismaConnect";
import { getServerSession } from "next-auth";
import { config } from "@/app/api/auth/auth";
import { NextResponse } from "next/server";

// eslint-disable-next-line import/prefer-default-export
export async function POST(req, context) {
  const session = await getServerSession(config);

  if (!session.user.isAdmin) {
    return NextResponse.json({ error: "Not an admin" }, { status: 403 });
  }
  const body = await req.json();
  // console.log("body", body)

  const newItem = await prisma.item.create({
    data: {
      name: body.name,
      price: parseInt(body.price),
      location: {
        connect: {
          id: body.location,
        },
      },
    },
  });
  return Response.json({ item: newItem });
}
