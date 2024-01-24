"use client";

import MenuItem from "@/components/menu/MenuItem";
import SectionHeaders from "@/components/layout/SectionHeaders";

import { useEffect, useState } from "react";

export default function DasherOrderPage({ order, id }) {
  console.log("dasher order page has", order);
  const [checked, setChecked] = useState();

  useEffect(() => {
    setChecked(order.paid);
  }, [order]);

  const setPaid = (val) => {
    fetch(`/api/orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ paid: val }),
    }).then((res) => {
      res.json().then((responseData) => {
        // console.log("respon", responseData.order);
        setChecked(responseData.order.paid);
        // setOrder(responseData.order);
      });
    });
  };
  if (order) {
    return (
      <section className="mt-8">
        Dasher name: {order.dasher ? order.dasher.name : "NO DASHER"}
        <br />
        Paid:
        {checked !== undefined && (
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              setPaid(!checked);
              setChecked(!checked);
            }}
          />
        )}
      </section>
    );
  }
}
