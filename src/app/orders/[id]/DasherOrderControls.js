"use client";

import { useEffect, useState } from "react";

function StatusStage({ statusName, statusKey, order, setStatus }) {
  const statusTime = order.OrderStatus[0][statusKey];
  const statusOrder = [
    "orderedAt",
    "acceptedAt",
    "placedAt",
    "pickedUpAt",
    "deliveredAt",
  ]; // Not ideal to hardcode
  const currentIndex = statusOrder.indexOf(statusKey);
  const previousStatus = statusOrder[currentIndex - 1];
  const disabled = !(
    currentIndex === 0 || order.OrderStatus[0][previousStatus]
  );

  return (
    <div
      className={` flex flex-col items-center border-r-2 border-black p-2 ${statusTime ? "bg-green-50" : "bg-gray-50"}`}
    >
      {statusName}:
      <br />
      {statusTime ? (
        new Date(statusTime).toLocaleString()
      ) : (
        <div
          className={`bg-gray-300 rounded-[10px] px-2 cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => !disabled && setStatus(statusKey)}
        >
          {" "}
          Now{" "}
        </div>
      )}
    </div>
  );
}

export default function DasherOrderPage({ order, id, update, admin }) {
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
            <StatusStage
              statusName="Ordered"
              statusKey="orderedAt"
              order={order}
              setStatus={setStatus}
            />
            <StatusStage
              statusName="Accepted"
              statusKey="acceptedAt"
              order={order}
              setStatus={setStatus}
            />
            <StatusStage
              statusName="Placed"
              statusKey="placedAt"
              order={order}
              setStatus={setStatus}
            />
            <StatusStage
              statusName="Picked Up"
              statusKey="pickedUpAt"
              order={order}
              setStatus={setStatus}
            />
            <StatusStage
              statusName="Delivered"
              statusKey="deliveredAt"
              order={order}
              setStatus={setStatus}
            />
          </div>
        </div>
      </section>
    );
  }
}
