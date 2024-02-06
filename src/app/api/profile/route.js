// import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/libs/prismaConnect";
import User from "@/models/User";
import UserInfo from "@/models/UserInfo";

export async function PUT(req) {
  const session = await getServerSession(authOptions);

  console.log("session", session);
  if (session.user.isAdmin) {
    console.log("have an admin");
  }

  const body = await req.json();

  // 	const currentUser = await prisma.user.findUnique({
  // 		where: { email : session.user.email},
  // 	});
  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  // 	const updatedUser = await prisma.user.update({
  // 		where: { email : session.user.email},
  // 		data: {
  // 			name: body.name ? body.name : currentUser.name,
  // 			image: body.image ? body.image : currentUser.image,
  // 			phone: body.phone ? body.phone : currentUser.phone,
  // 			roomNumber: body.roomNumber ? body.roomNumber : currentUser.roomNumber,
  // 			dorm: body.dorm ? body.dorm : currentUser.dorm,
  // 		}
  // 	});
  // 	prisma.$disconnect()
  const updatedUser = await prisma.user.update({
    where: { email: session.user.email },
    data: {
      name: body.name ? body.name : currentUser.name,
      image: body.image ? body.image : currentUser.image,
      phone: body.phone ? body.phone : currentUser.phone,
      roomNumber: body.roomNumber ? body.roomNumber : currentUser.roomNumber,
      dorm: body.dorm ? body.dorm : currentUser.dorm,
    },
  });

  return Response.json({ updatedUser });
}

export async function GET(req) {
  const session = await getServerSession(authOptions);

  // console.log("session", session)
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      isDasher: true,
      isAdmin: true,
      name: true,
      phone: true,
      dorm: true,
      roomNumber: true,
      dasherNotifications: true,
    },
  });

  return Response.json({ ...user });
}
