import { PrismaClient } from "@prisma/client";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import UserInfo from "@/models/UserInfo";

export async function PUT(req, context) {
  const prisma = new PrismaClient();
  const session = await getServerSession(authOptions);
  const targetUserId = context.params.id;

  // if the currnet user is an admin
  if (session.user.isAdmin) {
    const body = await req.json();

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const updatedUser = await prisma.user.update({
      where: { id: targetUserId },
      data: {
        name: body.name ? body.name : currentUser.name,
        image: body.image ? body.image : currentUser.image,
        phone: body.phone ? body.phone : currentUser.phone,
        roomNumber: body.roomNumber ? body.roomNumber : currentUser.roomNumber,
        dorm: body.dorm ? body.dorm : currentUser.dorm,
        isDasher: body.dasher,
        isAdmin: body.admin ? body.admin : currentUser.isAdmin,
      },
      select: {
        id: true,
        isDasher: true,
        isAdmin: true,
        name: true,
        phone: true,
        dorm: true,
        roomNumber: true,
      },
    });
    return Response.json({ user: updatedUser });
  }

  prisma.$disconnect();
  return Response.json({ user: "error" });
}

export async function GET(req, context) {
  const { id } = context.params;
  console.log("target id", id);

  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
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
  prisma.$disconnect();
  return Response.json({ user });
}

export async function PATCH(req, context) {
  const session = await getServerSession(authOptions);
  const { id } = context.params;
  if (id !== session.user.id) {
    return Response.status(400);
  }

  const prisma = new PrismaClient();

  let dasher = await prisma.user.findUnique({
    where: { id },
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

  if (dasher.isDasher !== true) {
    prisma.$disconnect();
    return Response.json({ dasher });
  }

  const modType = await req.nextUrl.searchParams.get("modify");
  const body = await req.json();

  if (modType === "notifications") {
    console.log("updating");

    dasher = await prisma.user.update({
      where: { id },
      data: {
        dasherNotifications: body.notifications,
      },
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
  }

  prisma.$disconnect();
  return Response.json({ dasher });
}
