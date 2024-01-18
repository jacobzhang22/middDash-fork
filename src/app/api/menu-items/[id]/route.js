import { PrismaClient } from '@prisma/client'


import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";


export async function PUT(req, context) {

	const prisma = new PrismaClient()
	const session = await getServerSession(authOptions);
	const targetItemId = context.params.id

	// if the currnet user is an admin
	console.log("session", session)
	if(session.user.isAdmin) {
		const body = await req.json()

		const currentItem = await prisma.item.findUnique({ 
			where: { id : targetItemId }, 
		})

		const updatedItem = await prisma.item.update({ 
			where: { id : targetItemId }, 
			data: {
				name: body.name ? body.name : currentItem.name,
				price: body.price ? parseInt(body.price) : currentItem.price,
			}

		});
		return Response.json({item: updatedItem});
	}

	prisma.$disconnect()
	return Response.json({item: "error"});

}

export async function GET(req, context) {
	const id = context.params.id
	console.log("target id", id)

	const prisma = new PrismaClient()
	const item = await prisma.item.findUnique({
	where: {
		id: id
	}
	 // select: {
		 // id: true,
		 // isDasher: true,
		 // isAdmin: true,
		 // name: true,
		 // phone: true,
		 // dorm: true,
		 // roomNumber: true
  // },	
	})
	prisma.$disconnect()

	return Response.json({item: item});
}
