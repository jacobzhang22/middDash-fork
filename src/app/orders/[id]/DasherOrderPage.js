"use client";

import MenuItem from "@/components/menu/MenuItem";
import SectionHeaders from "@/components/layout/SectionHeaders";

import { useEffect, useState } from "react";

export default function DasherOrderPage({ order }) {
  const [orderInfo, setOrderInfo] = useState();

  if (order) {
    return (
      <section className="mt-8">
        <div>
          <div className="text-center">
            <SectionHeaders mainHeader={`Order for ${order.user.name}`} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center  md:flex-row">
          <div className="w-[50%] p-5 ">
            <div className="text-center">
              <SectionHeaders subHeader="Items" />
            </div>
            {order.items.map((item) => (
              <div
                className="flex items-center gap-4 border-b py-4"
                key={item.id}
              >
                <div className="w-24">
                  {/* <Image */}
                  {/*   src={product.image} */}
                  {/*   alt={""} */}
                  {/*   width={240} */}
                  {/*   height={240} */}
                  {/* /> */}
                </div>
                <div className="grow">
                  <h3 className="font-semibold">{item.name}</h3>
                </div>
                <div className="text-lg font-semibold">${item.price}</div>
              </div>
            ))}
          </div>

          <div className="w-[50%] p-5 ">
            <div className="text-center">
              <SectionHeaders subHeader="Delivery Information" />
            </div>
            <div>
              From: {order.location.name}
              <br />
              To: {order.destinationDorm} - {order.destinationRoom}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
