// import { User } from "../../../models/User";
// import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

// eslint-disable-next-line import/prefer-default-export
export async function POST(req) {
  const body = await req.json();

  const prisma = new PrismaClient();
  // mongoose.connect(
  //   "mongodb+srv://midd-dash:midddash23@cluster0.usnrwxk.mongodb.net/midd-dash"
  // );

  const pass = body.password;
  if (!pass?.length || pass.length < 5) {
    // eslint-disable-next-line no-new
    new Error("password must be at least 5 characters");
  }
  const notHashedPassword = pass;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(notHashedPassword, salt);

  const createdUser = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });

  prisma.$disconnect();
  return Response.json(createdUser);
}
