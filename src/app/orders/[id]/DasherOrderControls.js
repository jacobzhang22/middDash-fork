"use client";

import MenuItem from "@/components/menu/MenuItem";
import SectionHeaders from "@/components/layout/SectionHeaders";

import { useEffect, useState } from "react";

export default function DasherOrderPage({ order, id, update, admin }) {
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

  const setStatus = (val) => {
    fetch(`/api/orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ statusId: order.OrderStatus[0].id, type: val }),
    }).then((res) => {
      res.json().then((responseData) => {
        // console.log("respon", responseData.order);
        update();
        // setChecked(responseData.order.paid);
        // setOrder(responseData.order);
      });
    });
  };
  if (order) {
    return (
      <section className="mt-8">
        Dasher name: {order.dasher ? order.dasher.name : "NO DASHER"}
        <br />
        <div className="items-center flex-row flex gap-2">
          Paid (marked by dasher):{" "}
          {checked !== undefined && (
            <input
              type="checkbox"
              checked={checked}
              disabled={!admin}
              onChange={(e) => {
                setPaid(!checked);
                setChecked(!checked);
              }}
            />
          )}
        </div>
        <div className="w-full flex flex-col justify-center items-center ">
          Status:
          <div className="flex flex-row text-center ">
            <div
              className={` flex flex-col items-center border-r-2 border-black p-2 ${order.OrderStatus[0].orderedAt ? "bg-green-50" : "bg-gray-50"}`}
            >
              Ordered:
              <br />
              {order.OrderStatus[0].orderedAt ? (
                new Date(order.OrderStatus[0].orderedAt).toLocaleString()
              ) : (
                <div
                  className="bg-gray-300 rounded-[10px] px-2 cursor-pointer"
                  onClick={() => setStatus("orderedAt")}
                >
                  {" "}
                  Now{" "}
                </div>
              )}
            </div>

            <div
              className={` flex flex-col items-center border-r-2 border-black p-2 ${order.OrderStatus[0].acceptedAt ? "bg-green-50" : "bg-gray-50"}`}
            >
              Accepted:
              <br />
              {order.OrderStatus[0].acceptedAt
                ? new Date(order.OrderStatus[0].acceptedAt).toLocaleString()
                : admin && (
                    <div
                      className="bg-gray-300 rounded-[10px] px-2 cursor-pointer"
                      onClick={() => setStatus("acceptedAt")}
                    >
                      {" "}
                      Now{" "}
                    </div>
                  )}
            </div>

            <div
              className={` flex flex-col items-center border-r-2 border-black p-2 ${order.OrderStatus[0].placedAt ? "bg-green-50" : "bg-gray-50"}`}
            >
              Placed :
              <br />
              {order.OrderStatus[0].placedAt
                ? new Date(order.OrderStatus[0].placedAt).toLocaleString()
                : admin && (
                    <div
                      className="bg-gray-300 rounded-[10px] px-2 cursor-pointer"
                      onClick={() => setStatus("placedAt")}
                    >
                      {" "}
                      Now{" "}
                    </div>
                  )}
            </div>

            <div
              className={` flex flex-col items-center border-r-2 border-black p-2 ${order.OrderStatus[0].pickedUpAt ? "bg-green-50" : "bg-gray-50"}`}
            >
              Picked Up:
              <br />
              {order.OrderStatus[0].pickedUpAt
                ? new Date(order.OrderStatus[0].pickedUpAt).toLocaleString()
                : admin && (
                    <div
                      className="bg-gray-300 rounded-[10px] px-2 cursor-pointer"
                      onClick={() => setStatus("pickedUpAt")}
                    >
                      {" "}
                      Now{" "}
                    </div>
                  )}
            </div>

            <div
              className={` flex flex-col items-center p-2 ${order.OrderStatus[0].deliveredAt ? "bg-green-50" : "bg-gray-50"}`}
            >
              Delivered:
              <br />
              {order.OrderStatus[0].deliveredAt
                ? new Date(order.OrderStatus[0].deliveredAt).toLocaleString()
                : admin && (
                    <div
                      className="bg-gray-300 rounded-[10px] px-2 cursor-pointer"
                      onClick={() => setStatus("deliveredAt")}
                    >
                      {" "}
                      Now{" "}
                    </div>
                  )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
