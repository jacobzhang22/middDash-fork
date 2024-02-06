import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/libs/prismaConnect";
// import { PrismaClient } from "@prisma/client/edge";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    console.error("Unauthorized");
    return Response.json({ error: "Unauthorized" }, 401);
  }

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
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    console.error("Unauthorized");
    return Response.json({ error: "Unauthorized" }, 401);
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
