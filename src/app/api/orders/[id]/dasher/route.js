import { PrismaClient } from "@prisma/client";

// eslint-disable-next-line import/prefer-default-export
export async function PATCH(req, context) {
  const prisma = new PrismaClient();

  const { id } = context.params;

  const body = await req.json();

  const order = await prisma.order.update({
    where: {
      id,
    },
    data: {
      dasher: { connect: { id: body.dasher } },
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
  prisma.$disconnect();

  return Response.json({ order });
}
