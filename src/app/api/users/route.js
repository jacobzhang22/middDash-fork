import { PrismaClient } from "@prisma/client";
// import { PrismaClient } from "@prisma/client/edge";

// eslint-disable-next-line import/prefer-default-export
export async function GET() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      isDasher: true,
      isAdmin: true,
      name: true,
    },
  });
  prisma.$disconnect();
  return Response.json({ users });
}
