// import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/libs/prismaConnect";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  const body = await req.json();
  console.log(body);
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

  return Response.json({ application });
}
