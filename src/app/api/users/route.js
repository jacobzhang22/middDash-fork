import { PrismaClient } from "@prisma/client";
import prisma from "@/libs/prismaConnect";
// import { PrismaClient } from "@prisma/client/edge";

// eslint-disable-next-line import/prefer-default-export
export async function GET() {
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
