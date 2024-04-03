"use client";

/* eslint-disable no-nested-ternary */

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Order({ info }) {
  const [color, setColor] = useState(0);
  const [orderStat, setOrderStat] = useState("unknown");
  // optimize this: use color to set a rgb value or tailwind color INLINE STATE
  useEffect(() => {
    if (info.OrderStatus[0].orderedAt) {
      setOrderStat("Ordered");
      setColor(1);
    }
    if (info.OrderStatus[0].acceptedAt) {
      setOrderStat("Accepted");
      setColor(2);
    }
    if (info.OrderStatus[0].placedAt) {
      setOrderStat("Placed");
      setColor(3);
    }
    if (info.OrderStatus[0].pickedUpAt) {
      setOrderStat("Picked up");
      setColor(4);
    }
    if (info.OrderStatus[0].deliveredAt) {
      setOrderStat("Delivered");
      setColor(5);
    }

    console.log("color", color);
  }, []);
  return (
    <Link
      className=" bg-gray-100 rounded-lg my-2 py-3 pl-4 flex w-full gap-4 hover:p-5 "
      href={`/orders/${info.id}`}
    >
      <span className="w-[80px]">
        {info.OrderStatus[0] &&
          new Date(info.OrderStatus[0].orderedAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
      </span>
      <div
        className={` mx-auto px-2 py-1 rounded-sm  ${color === 1 ? "bg-green-50" : color === 2 ? "bg-green-100" : color === 3 ? "bg-green-500" : color === 4 ? "bg-green-700" : "bg-green-950"} `}
      >
        {orderStat}
      </div>
      <span className="w-[40px]">${info.price}</span>
      <span className="w-[70px]">{info.destinationDorm}</span>
      <span className="">
        {info.OrderStatus[0] &&
          new Date(info.OrderStatus[0].orderedAt).toLocaleDateString()}
      </span>
      <span className="mr-3">{info.user.email}</span>
    </Link>
  );
}
