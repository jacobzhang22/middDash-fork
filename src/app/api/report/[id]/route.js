import { getServerSession } from "next-auth";
import prisma from "@/libs/prismaConnect";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(req, context) {
  const session = await getServerSession(authOptions);
  const targetReportId = context.params.id;

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
}
