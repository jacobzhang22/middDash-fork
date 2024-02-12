import { getServerSession } from "next-auth";
import { config } from "@/app/api/auth/auth";
import prisma from "@/libs/prismaConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await getServerSession(config);

  try {
    const reportData = await req.json();
    const report = await prisma.report.create({
      data: {
        ...reportData,
        userId: session.user.id,
      },
    });

    return Response.json({ report });
  } catch (error) {
    console.error("Failed to create report", error);
    return Response.json({ error: error.message }, 500);
  }
}

export async function GET(req) {
  const session = await getServerSession(config);

  if (!session.user.isAdmin) {
    return NextResponse.json({ error: "Not an admin" }, { status: 403 });
  }

  try {
    // const reports = await prisma.report.findMany();

    const reports = await prisma.report.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return Response.json({ reports });
  } catch (error) {
    console.error("Failed to fetch reports", error);
    return Response.json({ error: error.message }, 500);
  }
}
