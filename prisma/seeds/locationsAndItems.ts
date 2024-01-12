import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const grille = await prisma.location.upsert({
		where: { name: 'Grille' },
    update: {},
    create: {
      name: 'Grille',
      items: {
        create: [
          {
            name: 'Dr Feel Good',
          },
          {
            name: 'Something else',
          },
        ],
    },
		}
  })

  const middX = await prisma.location.upsert({
		where: { name: 'middX' },
    update: {},
    create: {
      name: 'middX',
      items: {
        create: [
          {
            name: 'Pizza',
          },
          {
            name: 'Gatorade',
          },
        ],
    },
		}
  })
  console.log({ grille, middX })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
