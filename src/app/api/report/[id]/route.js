import { getServerSession } from "next-auth";
import prisma from "@/libs/prismaConnect";
import { config } from "@/app/api/auth/auth";
import { NextResponse } from "next/server";

// eslint-disable-next-line import/prefer-default-export
export async function PUT(req, context) {
  const session = await getServerSession(config);

  if (!session.user.isAdmin) {
    return NextResponse.json({ error: "Not an admin" }, { status: 403 });
  }

  const targetReportId = context.params.id;

  const body = await req.json();

  const updatedReport = await prisma.report.update({
    where: { id: targetReportId },
    data: {
      isResolved: body.isResolved,
    },
  });

  return Response.json({ report: updatedReport });
}
