import { getServerSession } from "next-auth";
import prisma from "@/libs/prismaConnect";
import { config } from "@/app/api/auth/auth";
import { NextResponse } from "next/server";

export async function PUT(req, context) {
  const session = await getServerSession(config);
  const targetUserId = context.params.id;

  if (!session.user.isAdmin) {
    return NextResponse.json({ error: "Not an admin" }, { status: 403 });
  }
  // if the currnet user is an admin
  const body = await req.json();

  const currentUser = await prisma.user.findUnique({
    where: { id: targetUserId },
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
      isAdmin: body.admin,
    },
    select: {
      id: true,
      isDasher: true,
      isAdmin: true,
      name: true,
      phone: true,
      venmo: true,
      dorm: true,
      email: true,
      roomNumber: true,
    },
  });
  return Response.json({ user: updatedUser });
}

export async function GET(req, context) {
  const session = await getServerSession(config);

  if (!session.user.isAdmin) {
    return NextResponse.json({ error: "Not an admin" }, { status: 403 });
  }

  const { id } = context.params;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      isDasher: true,
      isAdmin: true,
      venmo: true,
      name: true,
      phone: true,
      email: true,
      dorm: true,
      roomNumber: true,
      dasherNotifications: true,
    },
  });
  return Response.json({ user });
}

export async function PATCH(req, context) {
  const session = await getServerSession(config);

  const { id } = context.params;
  // if not an admin or operating on myself
  if (!session.user.isAdmin && id !== session.user.id) {
    return NextResponse.json({ error: "Not an admin" }, { status: 403 });
  }

  let dasher = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      isDasher: true,
      isAdmin: true,
      name: true,
      phone: true,
      email: true,
      dorm: true,
      roomNumber: true,
      dasherNotifications: true,
    },
  });

  if (dasher.isDasher !== true) {
    return Response.json({ dasher });
  }

  const modType = await req.nextUrl.searchParams.get("modify");
  const body = await req.json();

  if (modType === "notifications") {
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
        email: true,
        venmo: true,
        phone: true,
        dorm: true,
        roomNumber: true,
        dasherNotifications: true,
      },
    });
  }

  return Response.json({ dasher });
}
