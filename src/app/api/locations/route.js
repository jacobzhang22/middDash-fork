import { MenuItem } from "../../../models/MenuItem";
import { PrismaClient } from '@prisma/client'
// import mongoose from "mongoose";


export async function GET(req) {
	const items = await req.nextUrl.searchParams.get("items")
	let locations 
	const prisma = new PrismaClient()
	if(items == "true") {
		locations = await prisma.location.findMany({
			include: {
				items: true,
			},
		})

	} else {
		locations = await prisma.location.findMany()
	}
		await prisma.$disconnect()
		// mongoose.connect(process.env.MONGO_URL);
		return Response.json(locations);
}
