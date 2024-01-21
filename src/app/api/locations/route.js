import { PrismaClient } from '@prisma/client';

async function GET(req) {
  const items = await req.nextUrl.searchParams.get('items');
  let locations;
  const prisma = new PrismaClient();
  if (items === 'true') {
    locations = await prisma.location.findMany({
      include: {
        items: true,
      },
    });
  } else {
    locations = await prisma.location.findMany();
  }
  await prisma.$disconnect();
  // mongoose.connect(process.env.MONGO_URL);
  return Response.json(locations);
}

export default GET;
