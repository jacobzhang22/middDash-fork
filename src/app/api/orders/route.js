import { PrismaClient } from "@prisma/client";

// eslint-disable-next-line import/prefer-default-export
export async function GET() {
  const prisma = new PrismaClient();
  const orders = await prisma.order.findMany({
    where: {
      active: true,
    },
    select: {
      id: true,
      location: true,
      user: true,
      items: true,
      destinationDorm: true,
      paid: true,
      dasher: true,
      OrderStatus: true,
      price: true,
    },
  });
  prisma.$disconnect();
  return Response.json({ orders });
}
