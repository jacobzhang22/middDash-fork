import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(req, context) {
  const prisma = new PrismaClient();
  const session = await getServerSession(authOptions);
  const targetReportId = context.params.id;

  try {
    if (session.user.isAdmin) {
      const body = await req.json();

      const updatedReport = await prisma.report.update({
        where: { id: targetReportId },
        data: {
          isResolved: body.isResolved,
        },
      });

      return Response.json({ report: updatedReport });
    }

    return Response.json({ error: "Unauthorized" });
  } catch (error) {
    console.error("Error updating report status:", error);
    return Response.json({ error: "Internal Server Error" });
  } finally {
    prisma.$disconnect();
  }
}