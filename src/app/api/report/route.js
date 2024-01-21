import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json({ error: "Unauthorized" }, 401);
  }

  const reportData = await req.json();

  try {
    const report = await prisma.report.create({
      data: {
        ...reportData,

        userId: session.user.id,
      },
    });

    await prisma.$disconnect();

    return Response.json({ report });
  } catch (error) {
    console.error("Failed to create report", error);
    return Response.json({ error: error.message }, 500);
  }
}
