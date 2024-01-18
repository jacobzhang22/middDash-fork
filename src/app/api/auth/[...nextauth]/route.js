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

  secret: process.env.NEXTAUTH_SECRET,
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
	callbacks: {
		async session({ session, token, user }) {
			session.user.id = token.userId
			session.user.isAdmin = token.isAdmin
			// console.log("returning session", session)
			return session
		},
		async jwt({ token, user }) {
			// * User only available on first run.
			// console.log("cur user", user)
			if (user) {
				// console.log("have user", user)
				token.userId = user.id
				token.isAdmin = user.isAdmin
				// token.premium = user.premium
			}

			// console.log("returning token", token)
			return token
		}
	}


};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
