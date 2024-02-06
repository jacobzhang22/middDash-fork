/* eslint-disable */
import { PrismaClient } from "@prisma/client";
import { grilleImage } from "./images/images.mjs";
import { middXImage } from "./images/middXImage.mjs";
async function main() {
  const prisma = new PrismaClient();

  // seed admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {
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
  });
  console.log({ grille, middX });
}
main()
  .then(async () => {})
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
