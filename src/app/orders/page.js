"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useProfile from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";

export default function MenuItemsPage() {
  const { loading, data } = useProfile();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders").then((res) => {
      res.json().then((newOrders) => {
        setOrders(newOrders.orders);
      });
    });
  }, []);

  if (loading) {
    return "Loading order info...";
  }

  if (!data.isAdmin) {
    return "Not an admin.";
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin />
      <div className="mt-8">
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
            return (
              <div
                key={order.id}
                className="bg-gray-100 rounded-lg mb-2 p-1 pl-4 md:inline-grid md:grid-cols-5 items-center w-full flex flex-col justify-center gap-2 md:gap-0  "
              >
                <span className="whitespace-nowrap col-span-1 ">
                  {order.location.name}
                </span>
                <div className="col-span-2">
                  <span className="text-gray-500">{order.user.name}</span>
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
    </section>
  );
}
