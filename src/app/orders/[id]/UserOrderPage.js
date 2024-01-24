"use client";

import MenuItem from "@/components/menu/MenuItem";
import SectionHeaders from "@/components/layout/SectionHeaders";

import { useEffect, useState } from "react";

export default function UserOrderPage({ order, id }) {
  console.log("dasher order page has", order);

  if (order) {
    return (
      <section className="mt-8">
        Dasher name: {order.dasher ? order.dasher.name : "NO DASHER"}
        <br />
        Marked as paid by the dasher:
        {order.paid !== undefined && (
          <input type="checkbox" checked={order.paid} onChange={(e) => {}} />
        )}
      </section>
    );
  }
}
