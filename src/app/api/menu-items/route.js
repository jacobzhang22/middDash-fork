import { MenuItem } from "../../../models/MenuItem";
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req, context) {

	const prisma = new PrismaClient()
	const session = await getServerSession(authOptions);

	// if the currnet user is an admin
	if(session.user.isAdmin) {
		const body = await req.json()
	// console.log("body", body)

		const newItem = await prisma.item.create({ 
			data: {
				name: body.name ,
				price: parseInt(body.price) ,
				location: {
					connect: {
						id: body.location,
					}
				},
			}

		});
		return Response.json({item: newItem});
	}

	prisma.$disconnect()
	return Response.json({item: "error"});

}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { _id, ...data } = await req.json();
  await MenuItem.findByIdAndUpdate(_id, data);
  return Response.json(true);
}

export async function GET() {
  const prisma = new PrismaClient();

  const allItems = await prisma.location.findMany({
    include: {
      items: true,
    },
  });

  await prisma.$disconnect();
  // mongoose.connect(process.env.MONGO_URL);
  return Response.json(allItems);
}

// export async function DELETE(req) {
  // const prisma = new PrismaClient()

  // const url = new URL(req.url);
  // const _id = url.searchParams.get("_id");
  // // await MenuItem.deleteOne({ _id });
  // await prisma.item.delete()

  // await prisma.$disconnect()
  // return Response.json(true);
// }
