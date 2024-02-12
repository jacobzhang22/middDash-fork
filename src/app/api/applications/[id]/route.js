// import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import nodemailer from "nodemailer";
import { config } from "@/app/api/auth/auth";
import prisma from "@/libs/prismaConnect";

export async function PATCH(req, context) {
  const { id } = context.params;
  const session = await getServerSession(config);

  if (!session.user.isAdmin) {
    return Response.json({
      status: "failure",
      data: "You must be an admin to proceede",
    });
  }

  const body = await req.json();

  let application;

  if (body.action === "approve") {
    // mark application as processed
    application = await prisma.application.update({
      where: { id },
      data: {
        isApproved: true,
        active: false,
      },
      select: {
        user: { select: { id: true, email: true } },
      },
    });

    // and user as a dasher
    await prisma.user.update({
      where: { id: application.user.id },
      data: {
        isDasher: true,
      },
    });

    // send them an email that they are now a dasher
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "midddevclub@gmail.com",
        pass: "ejuq wnnj iorg ggya",
      },
    });

    const mailOptions = {
      from: "midddevclub@gmail.com",
      to: application.user.email,
      // bc testing
      // to: "aballo@middlebury.edu",
      subject: "Dasher Application Approved",
      html: `
		<div>
		Your application has been approved. We are excited to work with you.
		<br/>
			Click <a href = "${process.env.NEXTAUTH_URL}/dash/active"> here </a> to view available orders
		</div>
		`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  } else if (body.action === "deny") {
    application = await prisma.application.update({
      where: { id },
      data: {
        isApproved: false,
        active: false,
      },
    });
  } else {
    return Response.json({ status: "failure", data: "Not an option" });
  }
  return Response.json({ status: "success", application });
}

export async function GET(req, context) {
  const { id } = context.params;

  const application = await prisma.application.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
  return Response.json({ application });
}
