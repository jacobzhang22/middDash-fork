import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";
import { PrismaClient } from "@prisma/client"


export async function PUT(req) {

const prisma = new PrismaClient()
 const session = await getServerSession(authOptions);

	const body = await req.json()
	console.log("data", body)

	const currentUser = await prisma.user.findUnique({ 
		where: { email : session.user.email},
	});

	const updatedUser = await prisma.user.update({ 
		where: { email : session.user.email},
		data: {
			name: body.name ? body.name : currentUser.name,
			image: body.image ? body.image : currentUser.image,
			phone: body.phone ? body.phone : currentUser.phone,
			roomNumber: body.roomNumber ? body.roomNumber : currentUser.roomNumber,
			dorm: body.dorm ? body.dorm : currentUser.dorm,
		}
	});
	prisma.$disconnect()

  return Response.json({updatedUser});
  // mongoose.connect(process.env.MONGO_URL);
  // const data = await req.json();
  // const { _id, name, image, ...otherUserInfo } = data;

  // let filter = {};
  // if (_id) {
  //   filter = { _id };
  // } else {
  //   const session = await getServerSession(authOptions);
  //   const email = session.user.email;
  //   filter = { email };
  // }

  // const user = await User.findOne(filter);
  // await User.updateOne(filter, { name: data.name, image: data.image });
  // await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, {
  //   upsert: true,
  // });

  // return Response.json(true);
}

export async function GET(req) {
const prisma = new PrismaClient()
 const session = await getServerSession(authOptions);

	// console.log("session", session)
	const user = await prisma.user.findUnique({ 
		where: { email : session.user.email}
	});
	prisma.$disconnect()

  return Response.json({ ...user });
}
