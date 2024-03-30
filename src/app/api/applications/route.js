import { getServerSession } from "next-auth";
import { config } from "@/app/api/auth/auth";
import prisma from "@/libs/prismaConnect";

export async function POST(req) {
  try {
    const body = await req.json();

    const application = await prisma.application.create({
      data: {
        name: body.name,
        year: body.year,
        managementInterest: body.management.toString(),
        days: body.days,
        phone: body.phone,
        email: body.email,
      },
    });

    return Response.json({ status: "success", application });
  } catch (e) {
    console.log("error", e);
    return Response.json({ status: "failure", data: e });
  }
}

export async function GET(req) {
  const applications = await prisma.application.findMany({
    where: { active: true },
    select: {
      id: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return Response.json({ applications });
}
