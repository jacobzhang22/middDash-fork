"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useProfile from "@/components/UseProfile";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";

export default function MenuItemsPage() {
  const { loading, data } = useProfile();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders").then((res) => {
      res.json().then((newOrders) => {
        console.log("new ordw", newOrders);
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
                className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4"
              >
                <div className=" flex flex-col md:flex-row space-y-2 space-x-0 md:space-x-2 md:space-y-0 items-center ">
                  <span className="whitespace-nowrap">
                    {order.location.name}
                  </span>
                  <div>
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
                <div />
              </div>
            );
          })}
      </div>
    </section>
  );
}
