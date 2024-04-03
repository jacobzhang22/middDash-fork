import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import nodemailer from "nodemailer";
import prisma from "@/libs/prismaConnect";
import { config } from "@/app/api/auth/auth";
// import twilio from 'twilio'

// async function sendSMS(client, from, to, body) {
//  const sent = await client.messages.create({ from, to, body })
//	console.log("sent text:", sent)
// }

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
      to: [...activeDashers.map((dasher) => dasher.email), session.user.email],
      subject: "New Order",
      html: `
		<div>
		<div style = "text-align:center; width: 100%; font-size: 30px; font-weight: 900;  ">
			MiddDash New order
		</div>
		<br/>
			From: ${location.name}
			<br/>
			To: ${order.destinationDorm}
			<br/>
			Items: ${cartProducts.map((prod) => `<span> ${prod.name} </span>`).join(", ")}
			<br/>
			<div style = "display:flex; justify-content: center; align-items: center;margin-top: 20px">
			<a href = "${process.env.NEXTAUTH_URL}/orders/${order.id}" style = "width: 150px; border-radius: 10px; background-color: blue; color: white; margin-left: auto; margin-right:auto; padding: 10px; text-decoration: none; font-weight: 900; text-align: center" >View Order</a>
			</div>
		</div>
		`,
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });

    // also text it
    // const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH)
    // sendSMS(client, "+18556483488", "+14434017876", "testing" )
  }

  return new NextResponse(JSON.stringify({ data: order }), { status: 200 });
}
