import { User } from "../../../models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(
    "mongodb+srv://midd-dash:midddash23@cluster0.usnrwxk.mongodb.net/midd-dash"
  );
  const pass = body.password;
  if (!pass?.length || pass.length < 5) {
    new Error("password must be at least 5 characters");
  }
  const notHashedPassword = pass;
  var salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(notHashedPassword, salt);

  const createdUser = await User.create(body);
  return Response.json(createdUser);
}
