import { getServerSession } from "next-auth";
import { config } from "@/app/api/auth/auth";
import prisma from "@/libs/prismaConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await getServerSession(config);

  if (!session || !session.user.isAdmin) {
    return NextResponse.json({ error: "Not an Admin" }, { status: 403 });
  }

  try {
    const control = await prisma.adminControls.findFirst();
    const updatedControl = await prisma.adminControls.update({
      where: { id: control.id },
      data: { orderFreeze: !control.orderFreeze },
    });
    return NextResponse.json({ orderFreeze: updatedControl.orderFreeze });
  } catch (error) {
    console.error("Failed to toggle order freeze", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  const session = await getServerSession(config);

  if (!session || !session.user.isAdmin) {
    return NextResponse.json({ error: "Not an Admin" }, { status: 403 });
  }

  try {
    const control = await prisma.adminControls.findFirst();
    if (!control) {
      return NextResponse.json(
        { error: "Order freeze control not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ orderFreeze: control.orderFreeze });
  } catch (error) {
    console.error("Failed to get order freeze state", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
