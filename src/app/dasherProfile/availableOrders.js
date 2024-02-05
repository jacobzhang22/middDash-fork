"use client";

import { useState, useEffect } from "react";
import Order from "./orders.js";

export default function AvailableOrders() {
  const [orders, setOrders] = useState();
  useEffect(() => {
    fetch("/api/orders?type=available")
      .then((res) => res.json())
      .then((res) => {
        setOrders(res.orders);
      });
  }, []);

  return (
    <div className="max-w-md max-h-md mx-auto mt-4 flex flex-col">
      <h2 className="font-heading text-3xl text-gray-500 text-center">
        Available Orders:
      </h2>

      {orders &&
        orders.map((order) => (
          <div key={order.id}>
            <Order info={order} />
          </div>
        ))}
    </div>
  );
}
