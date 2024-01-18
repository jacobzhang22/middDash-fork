import { PrismaClient } from '@prisma/client'

export async function GET() {
	const prisma = new PrismaClient()
	const users = await prisma.user.findMany({
	 select: {
    id: true,
    isDasher: true,
    isAdmin: true,
    name: true,
  },	
	})
	prisma.$disconnect()
	return Response.json({users});
}
