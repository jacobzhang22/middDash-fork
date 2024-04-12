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
        userVenmo: true,
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
  if (body.statusId && !body.dasherId) {
    const data = {};

    data[body.type] = new Date();
    const status = await prisma.OrderStatus.update({
      where: { id: body.statusId },
      data: { ...data },
      select: {
        order: true,
        orderedAt: true,
        acceptedAt: true,
        placedAt: true,
        pickedUpAt: true,
        deliveredAt: true,
      },
    });
    const userEmail = await prisma.user.findUnique({
      where: { id: status.order.userId },
      select: { email: true },
    });
    console.log("order", status, "for ", userEmail);

    let curStatus = "NONE";
    if (status.orderedAt) {
      curStatus = "Ordered";
    }
    if (status.acceptedAt) {
      curStatus = "Accepted";
    }
    if (status.placedAt) {
      curStatus = "Placed";
    }
    if (status.pickedUpAt) {
      curStatus = "Picked Up";
    }
    if (status.deliveredAt) {
      curStatus = "Delivered";
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "midddevclub@gmail.com",
        pass: "ejuq wnnj iorg ggya",
      },
    });

    const mailOptions = {
      from: "midddevclub@gmail.com",
      to: userEmail.email,
      subject: `Order Status Update: ${curStatus} `,
      html: `
		<div>
		Your order has been updated: ${curStatus}
		<br/>
			<div style = "display:flex; justify-content: center; align-items: center;margin-top: 20px">
			<a href = "${process.env.NEXTAUTH_URL}/orders/${status.order.id}" style = "width: 150px; border-radius: 10px; background-color: blue; color: white; margin-left: auto; margin-right:auto; padding: 10px; text-decoration: none; font-weight: 900; text-align: center" >View Order</a>
			</div>
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

    return Response.json({ status });
  }

  // for adding a dasher to an order
  if (body.dasherId && body.statusId) {
    // add dasher to order
    const order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        dasher: { connect: { id: body.dasherId } },
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
    // update order status
    const data = {};

    data.acceptedAt = new Date();
    await prisma.OrderStatus.update({
      where: { id: body.statusId },
      data: { ...data },
      select: {
        order: true,
        orderedAt: true,
        acceptedAt: true,
        placedAt: true,
        pickedUpAt: true,
        deliveredAt: true,
      },
    });

    return Response.json({ order });
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
      userVenmo: true,
      locationId: true,
      price: true,
      location: true,
      items: true,
      destinationDorm: true,
      destinationRoom: true,
      phone: true,
      user: {
        select: {
          name: true,
          email: true,
          dorm: true,
          phone: true,
          roomNumber: true,
          venmo: true,
        },
      },
      paid: true,
      dasher: true,
      OrderStatus: true,
      specialInstructions: true,
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
