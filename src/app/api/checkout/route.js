import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import nodemailer from "nodemailer";
import prisma from "@/libs/prismaConnect";
import { config } from "@/app/api/auth/auth";

// eslint-disable-next-line import/prefer-default-export
export async function POST(req, res) {
  const session = await getServerSession(config);

  const { cartProducts, address, instructions } = await req.json();
  console.log("cart", cartProducts);

  // should really pull from db instead of post to avoid spoofing
  const totalPrice = cartProducts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0,
  );

  const order = await prisma.order.create({
    data: {
      isActive: true,
      userId: session.user.id,
      locationId: cartProducts[0].locationId,
      price: totalPrice,
      items: { connect: cartProducts.map((prod) => ({ id: prod.id })) },
      destinationDorm: address.dorm,
      destinationRoom: address.roomNumber,
      userVenmo: address.venmo,
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
			<br/>
			<a href = "${process.env.NEXTAUTH_URL}/orders/${order.id}">View Order</a>
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

  return new NextResponse(JSON.stringify({ data: order }), { status: 200 });
}
