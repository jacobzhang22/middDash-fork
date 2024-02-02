import { PrismaClient } from "@prisma/client";

// eslint-disable-next-line import/prefer-default-export
export async function GET(req) {
  const prisma = new PrismaClient();

  const type = await req.nextUrl.searchParams.get("type");

  let orders = await prisma.order.findMany({
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

  if (type === "available") {
    orders = orders.filter((order) => order.dasher === null);
  }
  return Response.json({ orders });
}
