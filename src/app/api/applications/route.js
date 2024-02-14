import { getServerSession } from "next-auth";
import { config } from "@/app/api/auth/auth";
import prisma from "@/libs/prismaConnect";

export async function POST(req) {
  try {
    const session = await getServerSession(config);

    const body = await req.json();

    // first update year of the user
    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        year: body.year,
      },
    });

    const application = await prisma.application.create({
      data: {
        user: { connect: { id: session.user.id } },
      },
    });

    return Response.json({ status: "success", application });
  } catch (e) {
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
