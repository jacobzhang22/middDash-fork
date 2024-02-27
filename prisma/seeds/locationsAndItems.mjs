/* eslint-disable */
import { PrismaClient } from "@prisma/client";
import { grilleImage } from "./images/images.mjs";
import { middXImage } from "./images/middXImage.mjs";
async function main() {
  const prisma = new PrismaClient();

  const controls = await prisma.adminControls.create({
    data: {
      orderFreeze: false,
    },
  });
  // seed admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {
      name: "Admin User 1",
      isDasher: false,
      dasherNotifications: false,
      isAdmin: true,
      // password "admin"
      password: "$2a$10$/j3KTMx3/U6rYmDPCY1eoOHw3V1O5yskksgwH2zKuWI6gaXj6ABJC",
      dorm: "battell",
      roomNumber: "100",
      phone: "184-481-4818",
    },
    create: {
      email: "admin@gmail.com",
      name: "Admin User 1",
      isDasher: false,
      dasherNotifications: false,
      isAdmin: true,
      // password "admin"
      password: "$2a$10$/j3KTMx3/U6rYmDPCY1eoOHw3V1O5yskksgwH2zKuWI6gaXj6ABJC",
      dorm: "battell",
      roomNumber: "100",
      phone: "184-481-4818",
    },
  });

  // add a dasher
  const dasher = await prisma.user.upsert({
    where: { email: "dasher@gmail.com" },
    update: {
      name: "Dasher User 1",
      isDasher: true,
      dasherNotifications: true,
      isAdmin: false,
      // password "dasher"
      password: "$2a$10$JUltXnGRKGysijW5Xa7A9Og4vMnLGEFORhEpaUhS6nffhfw.xcr1q",
      dorm: "ross",
      roomNumber: "500",
      phone: "10581810831",
    },
    create: {
      email: "dasher@gmail.com",
      name: "Dasher User 1",
      isDasher: true,
      dasherNotifications: true,
      isAdmin: false,
      // password "dasher"
      password: "$2a$10$JUltXnGRKGysijW5Xa7A9Og4vMnLGEFORhEpaUhS6nffhfw.xcr1q",
      dorm: "ross",
      roomNumber: "500",
      phone: "10581810831",
    },
  });

  // add a normie
  const reg = await prisma.user.upsert({
    where: { email: "reg@gmail.com" },
    update: {
      name: "Normie User 1",
      isDasher: false,
      dasherNotifications: false,
      isAdmin: false,
      // password "reg"
      password: "$2a$10$PCDwPD7NYBeP42Uw1tvSUO9HjVdUUAZb9aZ5I/7BOyMs4tNmJ37OC",
      dorm: "chateau",
      roomNumber: "400",
      phone: "410841381",
    },
    create: {
      email: "reg@gmail.com",
      name: "Normie User 1",
      isDasher: false,
      dasherNotifications: false,
      isAdmin: false,
      // password "reg"
      password: "$2a$10$PCDwPD7NYBeP42Uw1tvSUO9HjVdUUAZb9aZ5I/7BOyMs4tNmJ37OC",
      dorm: "chateau",
      roomNumber: "400",
      phone: "410841381",
    },
  });

  // seed grille
  const grille = await prisma.location.upsert({
    where: { name: "Grille" },
    update: {},
    create: {
      name: "Grille",
      image: grilleImage,
      items: {
        create: [
          {
            name: "Dr Feel Good",
            price: 5,
            featured: true,
          },
          {
            name: "Something else",
            price: 2,
          },
        ],
      },
    },
  });

  // seed middX
  const middX = await prisma.location.upsert({
    where: { name: "middX" },
    update: {},
    create: {
      name: "middX",
      image: middXImage,
      items: {
        create: [
          {
            name: "Pizza",
            price: 4,
          },
          {
            name: "Gatorade",
            price: 19,
          },
        ],
      },
    },
    select: {
      id: true,
      items: true,
    },
  });

  console.log("middx", middX);

  // add some orders
  const order = await prisma.order.create({
    data: {
      user: { connect: { id: reg.id } },
      location: { connect: { id: middX.id } },
      items: {
        connect: [{ id: middX.items[0].id }],
      },
      price: middX.items[0].price,
      destinationDorm: "dest dorm",
      destinationRoom: "dest room",
      phone: "dest phone",
      OrderStatus: {
        create: [{ orderedAt: new Date() }],
      },
    },
  });

  // console.log({ grille, middX });
}
main()
  .then(async () => {})
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
