// import { User } from "../../../models/User";
// import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import prisma from "@/libs/prismaConnect";

// eslint-disable-next-line import/prefer-default-export
export async function POST(req) {
  const body = await req.json();

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

  return Response.json(createdUser);
}
