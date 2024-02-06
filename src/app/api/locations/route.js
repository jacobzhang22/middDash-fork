import { PrismaClient } from "@prisma/client";
import prisma from "@/libs/prismaConnect";

// eslint-disable-next-line import/prefer-default-export
export async function GET(req) {
  const items = await req.nextUrl.searchParams.get("items");
  let locations;
  if (items === "true") {
    locations = await prisma.location.findMany({
      include: {
        items: true,
      },
    });
  } else {
    locations = await prisma.location.findMany();
  }
  // mongoose.connect(process.env.MONGO_URL);
  return Response.json(locations);
}
