// import mongoose from "mongoose";
// const stripe = require("stripe")(process.env.STRIPE_SK);

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import nodemailer from "nodemailer";
import { authOptions } from "../auth/[...nextauth]/route";

// eslint-disable-next-line import/prefer-default-export
export async function POST(req, res) {
  // mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  console.log("session", session);

  const prisma = new PrismaClient();
  const { cartProducts, address, instructions } = await req.json();
  console.log("cart", cartProducts);

  // should really pull from db instead of post to avoid spoofing
  const totalPrice = cartProducts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0,
  );

  console.log("total price", totalPrice);
  console.log("address", address);

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      locationId: cartProducts[0].locationId,
      price: totalPrice,
      items: { connect: cartProducts.map((prod) => ({ id: prod.id })) },
      destinationDorm: address.dorm,
      destinationRoom: address.roomNumber,
      phone: address.phone,
      OrderStatus: {
        create: [{ orderedAt: new Date() }],
      },
      specialInstructions: instructions,
    },
  });

  const location = await prisma.location.findUnique({
    where: { id: order.locationId },
  });
  // send the order to everyone who has notifications on
  //
  const activeDashers = await prisma.user.findMany({
    where: { isDasher: true, dasherNotifications: true },
  });
  console.log("active dashers:", activeDashers);

  // console.log("cart procd", cartProducts)
  // console.log("testing", cartProducts.map(prod => {return `<span>${prod.name}</span>` }).join(", "))

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "midddevclub@gmail.com",
      pass: "ejuq wnnj iorg ggya",
    },
  });

  if (activeDashers.length > 0) {
    const mailOptions = {
      from: "midddevclub@gmail.com",
      to: activeDashers.map((dasher) => dasher.email),
      subject: "New Order",
      html: `
		<div>
		New order:
		<br/>
			From: ${location.name}
			<br/>
			To: ${order.destinationDorm}
			<br/>
			Items: ${cartProducts.map((prod) => `<span> ${prod.name} </span>`).join(", ")}
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
  }

  prisma.$disconnect();

  return new NextResponse(JSON.stringify({ data: order }), { status: 200 });
}
