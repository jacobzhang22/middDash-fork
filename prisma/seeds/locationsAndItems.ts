/* eslint-disable */
import prisma from "@/libs/prismaConnect";

import { grilleImage, middXImage } from "./images/images";
// import middXImage from "./images/middXImage.js"
async function main() {
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
