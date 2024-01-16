import { PrismaClient } from '@prisma/client'

export async function GET() {
	const prisma = new PrismaClient()
	const users = await prisma.user.findMany()
	prisma.$disconnect()
	return Response.json(users);
}
