/* eslint-disable no-param-reassign */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/libs/prismaConnect";
import { config } from "../auth";
// import clientPromise from '@/libs/mongoConnect';
// import { User } from '../../../../models/User';

// const prisma = new PrismaClient();

export const authOptions = config;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
