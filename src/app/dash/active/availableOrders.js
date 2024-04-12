"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AvailableOrders() {
  const [orders, setOrders] = useState();
  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((res) => {
        setOrders(res.orders);
      });
  }, []);

  return (
    <div className=" max-w-[600px] max-h-md mx-auto mt-4 flex flex-col">
      <h2 className="font-heading text-3xl text-gray-500 text-center">
        Orders:
      </h2>

      <div className="mt-8">
        <h1 className="text-center">OPEN ORDERS</h1>
        {orders?.length > 0 &&
          orders.map((order) => {
            let orderStat = "unknown";
            if (order.OrderStatus[0].orderedAt) {
              orderStat = "Ordered";
            }
            if (order.OrderStatus[0].acceptedAt) {
              orderStat = "Accepted";
            }
            if (order.OrderStatus[0].placedAt) {
              orderStat = "Placed";
            }
            if (order.OrderStatus[0].pickedUpAt) {
              orderStat = "Picked Up";
            }
            if (order.OrderStatus[0].deliveredAt) {
              orderStat = "Delivered";
            }
            if (orderStat === "Delivered") {
              return <div key={order.id} />;
            }
            return (
              <div
                key={order.id}
                className="bg-gray-100 rounded-lg mb-2 p-1 pl-4 md:inline-grid md:grid-cols-6 items-center w-full flex flex-col justify-center gap-2 md:gap-0  "
              >
                <span className="whitespace-nowrap col-span-1 ">
                  {
                    new Date(order.OrderStatus[0].orderedAt)
                      .toLocaleString()
                      .split(",")[1]
                  }
                </span>
                <span className="whitespace-nowrap col-span-1 ">
                  {order.location.name}
                </span>
                <div className="col-span-2">
                  <span className="text-gray-500">
                    {order.user.name ? order.user.name : order.user.email}
                  </span>
                </div>
                <div>
                  {!!order.paid && (
                    <span className="bg-[#fff71c] rounded-lg p-2">PAID</span>
                  )}
                  <span className="bg-[#fff71c] rounded-lg p-2">
                    {orderStat}
                  </span>
                </div>
                <Link className="button" href={`/orders/${order.id}`}>
                  View
                </Link>
              </div>
            );
          })}
        <h1 className="text-center">COMPLETED ORDERS</h1>
        {orders?.length > 0 &&
          orders.map((order) => {
            let orderStat = "unknown";
            if (order.OrderStatus[0].orderedAt) {
              orderStat = "Ordered";
            }
            if (order.OrderStatus[0].acceptedAt) {
              orderStat = "Accepted";
            }
            if (order.OrderStatus[0].placedAt) {
              orderStat = "Placed";
            }
            if (order.OrderStatus[0].pickedUpAt) {
              orderStat = "Picked Up";
            }
            if (order.OrderStatus[0].deliveredAt) {
              orderStat = "Delivered";
            }
            if (orderStat !== "Delivered") {
              return <div key={order.id} />;
            }
            return (
              <div
                key={order.id}
                className="bg-gray-100 rounded-lg mb-2 p-1 pl-4 md:inline-grid md:grid-cols-5 items-center w-full flex flex-col justify-center gap-2 md:gap-0  "
              >
                <span className="whitespace-nowrap col-span-1 ">
                  {order.location.name}
                </span>
                <div className="col-span-2">
                  <span className="text-gray-500">
                    {order.user.name ? order.user.name : order.user.email}
                  </span>
                </div>
                <div>
                  {!!order.paid && (
                    <span className="bg-[#fff71c] rounded-lg p-2">PAID</span>
                  )}
                  <span className="bg-[#fff71c] rounded-lg p-2">
                    {orderStat}
                  </span>
                </div>
                <Link className="button" href={`/orders/${order.id}`}>
                  Edit
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
