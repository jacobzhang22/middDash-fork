// import mongoose from "mongoose";
// const stripe = require("stripe")(process.env.STRIPE_SK);

import {authOptions} from "../auth/[...nextauth]/route.js"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

export async function POST(req, res) {
  // mongoose.connect(process.env.MONGO_URL);
	const session = await getServerSession(authOptions)
	console.log("session", session)

	const prisma = new PrismaClient()
  const { cartProducts, address } = await req.json();
	console.log("cart", cartProducts)


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
			items: { connect: cartProducts.map(prod => { return  { id: prod.id }}) },
			destinationDorm: address.dorm,
			destinationRoom: address.roomNumber,
			phone: address.phone
		}
	})


	prisma.$disconnect()

		return new NextResponse(JSON.stringify(
		{ data: order }
	), { status: 200 })


  //   const stripeSession = await stripe.checkout.sessions.create({
  //     line_items: [],
  //     mode: "payment",
  //     customer_email: "",
  //     success_url: "",
  //     cancel_url: "",
  //     metadata: { orderId: null },
  //     shipping_options: [
  //       {
  //         shipping_rate_data: {
  //           display_name: "Delivery fee",
  //           type: "fixed_amount",
  //           fixed_amount: { amount: 500, currency: "USD" },
  //         },
  //       },
  //     ],
  //   });
}
