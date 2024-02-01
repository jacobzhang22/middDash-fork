import { PrismaClient } from "@prisma/client";

// eslint-disable-next-line import/prefer-default-export
export async function GET() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany({
    select: {
      id: true,
      isDasher: true,
      isAdmin: true,
      name: true,
    },
  });
  prisma.$disconnect();
  return Response.json({ users });
}
