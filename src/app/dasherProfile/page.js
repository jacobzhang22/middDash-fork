"use client";

import { useState } from "react";
import Link from "next/link";
import PastOrders from "./pastOrders";
import AvailableOrders from "./availableOrders";

export default function DasherProfile() {
  const [notify, setNotify] = useState(false);

  const handleNotify = () => {
    setNotify(!notify);
  };

  return (
    <div>
      <div>
        <h1 className="font-heading text-5xl text-center">Dasher Page</h1>
      </div>
      <AvailableOrders />
    </div>
  );
}
