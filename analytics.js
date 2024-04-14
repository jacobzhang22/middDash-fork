const PrismaClient = require("@prisma/client");

// Docs about instantiating `PrismaClient` with Next.js:
// https://pris.ly/d/help/next-js-best-practices

// let prisma

// if (process.env.NODE_ENV === "production") {
//
async function temp() {
  const prisma = new PrismaClient.PrismaClient();

  const orders = await prisma.order.findMany({
    select: {
      id: true,
      // userId: true,
      // testing: true,
      // locationId: true,
      price: true,
      // destinationDorm: true,
      // destinationRoom: true,
      // phone: true,
      // paid: true,
      // dasherId: true,
      // isActive: true,
      // active: true,
      // specialInstructions: true,
      // userVenmo: true,
      // dasher: true,
      // location: true,
      // user: true,
      OrderStatus: true,
      // items: true,
      // _count: true
    },
  });
  const times = [];
  orders.forEach((order) => {
    const hour = order.OrderStatus[0].orderedAt.getHours().toString();
    const minute = order.OrderStatus[0].orderedAt.getMinutes().toString();
    const concat = `${hour}:${minute.slice(0, 1)}`;
    times.push(concat);
  });

  const dictTimes = {};
  times.forEach((time) => {
    if (dictTimes[time]) {
      dictTimes[time] += 1;
    } else {
      dictTimes[time] = 1;
    }
  });
  console.log(dictTimes);

  prisma.$disconnect();
}
temp();

// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   prisma = global.prisma;
// }
