import prisma from "@/libs/prismaConnect";
import nodemailer from "nodemailer";

export async function PATCH(req, context) {
  const { id } = context.params;

  const body = await req.json();

  // for updating an orders paid value
  if (body.paid) {
    const order = await prisma.order.update({
      where: { id },
      data: {
        paid: body.paid,
      },
      select: {
        userId: true,
        locationId: true,
        price: true,
        location: true,
        items: true,
        destinationDorm: true,
        destinationRoom: true,
        phone: true,
        user: true,
        paid: true,
        OrderStatus: true,
        dasher: true,
        dasherId: true,
        isActive: true,
      },
    });

    return Response.json({ order });
  }
  // for updating the status of an item
  if (body.statusId) {
    const data = {};

    data[body.type] = new Date();
    const status = await prisma.OrderStatus.update({
      where: { id: body.statusId },
      data: { ...data },
    });

    return Response.json({ status });
  }
}

export async function GET(req, context) {
  const { id } = context.params;

  const order = await prisma.order.findUnique({
    where: {
      id,
    },
    select: {
      userId: true,
      locationId: true,
      price: true,
      location: true,
      items: true,
      destinationDorm: true,
      destinationRoom: true,
      phone: true,
      user: true,
      paid: true,
      dasher: true,
      OrderStatus: true,
      isActive: true,
    },
  });

  return Response.json({ order });
}

// marks order as inactive
export async function DELETE(req, context) {
  const { id } = context.params;
  // console.log("target id", id);

  const order = await prisma.order.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
    select: {
      userId: true,
      locationId: true,
      price: true,
      location: true,
      items: true,
      destinationDorm: true,
      destinationRoom: true,
      phone: true,
      user: true,
      paid: true,
      dasher: true,
      OrderStatus: true,
      isActive: true,
    },
  });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "midddevclub@gmail.com",
      pass: "ejuq wnnj iorg ggya",
    },
  });

  const mailOptions = {
    from: "midddevclub@gmail.com",
    to: order.user.email,
    subject: "Order Deleted",
    html: `
		<div>
		Your order has been deleted
		<br/>
			From: ${order.location.name}
			<br/>
			To: ${order.destinationDorm}
			<br/>
			Items: ${order.items.map((prod) => `<span> ${prod.name} </span>`).join(", ")}
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

  return Response.json({ order });
}
