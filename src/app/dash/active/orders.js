"use client";

import { useState } from "react";
import Link from "next/link";

export default function Order({ info }) {
  return (
    <Link
      className=" bg-gray-100 rounded-lg my-2 py-3 pl-4 flex w-full gap-4 hover:p-5 "
      href={`/orders/${info.id}`}
    >
      <span>${info.price}</span>
      <span className="">
        {info.location.name} {`->`} {info.destinationDorm}
      </span>
      <span className="">
        {info.OrderStatus[0] &&
          new Date(info.OrderStatus[0].orderedAt).toLocaleTimeString()}{" "}
        -{" "}
        {info.OrderStatus[0] &&
          new Date(info.OrderStatus[0].orderedAt).toLocaleDateString()}
      </span>
    </Link>
  );
}
