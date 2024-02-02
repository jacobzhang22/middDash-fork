"use client";

import { useState } from "react";
import Link from "next/link";

export default function Order({ info }) {
  console.log(info);
  return (
    <Link
      className=" bg-gray-100 rounded-lg mb-2 p-1 pl-4 flex w-full gap-4 hover:p-5 "
      href={`/orders/${info.id}`}
    >
      <span>${info.price}</span>
      <span className="">
        {info.location.name} {`->`} {info.destinationDorm}
      </span>
      <span className="">
        {new Date(info.OrderStatus[0].orderedAt).toLocaleTimeString()} -{" "}
        {new Date(info.OrderStatus[0].orderedAt).toLocaleDateString()}
      </span>
    </Link>
  );
}
