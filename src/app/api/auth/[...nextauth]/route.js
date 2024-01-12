import { User } from "../../../../models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/libs/mongoConnect";

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

export const authOptions = {

	session: {
		strategy: 'jwt',
	},

  secret: process.env.SECRET,
  // adapter: MongoDBAdapter(clientPromise),
	adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        const user = await prisma.user.findUnique({ 
					where: { email : email}
				});
        const passwordOk =
          user && (await bcrypt.compare(password, user.password));
        if (passwordOk) {
          return user;
        }
        return null;
      },
    }),
	],

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
