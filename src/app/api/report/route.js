import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        console.error("Unauthorized");
        return Response.json({ error: "Unauthorized" }, 401);
    }

    const reportData = await req.json();

    try {
        const report = await prisma.report.create({
            data: {
                ...reportData,
                userId: session.user.id,
            },
        });

        prisma.$disconnect();

        return Response.json({ report });
    } catch (error) {
        console.error("Failed to create report", error);
        return Response.json({ error: error.message }, 500);
    }
}

export async function GET(req) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        console.error("Unauthorized");
        return Response.json({ error: "Unauthorized" }, 401);
    }

    try {
        const reports = await prisma.report.findMany();
        
        prisma.$disconnect();

        return Response.json({ reports });
    } catch (error) {
        console.error("Failed to fetch reports", error);
        return Response.json({ error: error.message }, 500);
    }
}