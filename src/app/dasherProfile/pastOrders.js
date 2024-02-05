"use client";

import { useState } from "react";
import Order from "./orders.js";

export default function PastOrders() {
  const [orderList, setOrderList] = useState([
    {
      name: "Brian",
      location: "home",
      timestamp: 9302,
      items: ["food", "drink", "aasef"],
    },
    {
      name: "Peter",
      location: "away",
      timestamp: 1402,
      items: ["asdf", "dfgh", "xcvb"],
    },
    {
      name: "Lois",
      location: "market",
      timestamp: 1929,
      items: ["wer", "hfd", "hgf"],
    },
  ]);

  return (
    <div>
      {orderList.map((order) => (
        <p key={order.id} className="text-center">
          <Order
            orderName={order.name}
            orderLocation={order.location}
            orderTime={order.timestamp}
            orderItems={order.items}
          />
        </p>
      ))}
    </div>
  );
}
