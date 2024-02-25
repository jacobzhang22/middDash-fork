import prisma from "@/libs/prismaConnect";
import { getServerSession } from "next-auth";
import { config } from "@/app/api/auth/auth";
import { NextResponse } from "next/server";

// eslint-disable-next-line import/prefer-default-export
export async function GET() {
  const session = await getServerSession(config);

  if (!session.user.isAdmin) {
    return NextResponse.json({ error: "Not an admin" }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      isDasher: true,
      isAdmin: true,
      name: true,
    },
  });
  return Response.json({ users });
}
