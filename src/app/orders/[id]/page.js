"use client";

import { useRouter, useParams, refresh } from "next/navigation";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import Left from "@/components/icons/Left";
import useProfile from "@/components/UseProfile";
import MenuItemForm from "@/components/layout/MenuItemForm";
import DeleteButton from "@/components/DeleteButton";
import SectionHeaders from "@/components/layout/SectionHeaders";
import DasherOrderControls from "./DasherOrderControls.js";

export default function IndividualOrder() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState();
  const [orderStatus, setOrderStatus] = useState();
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch(`/api/orders/${id}`).then((res) => {
      res.json().then((responseData) => {
        console.log("responseData", responseData.order);
        setOrder(responseData.order);
      });
    });
  }, []);

  const update = () => {
    window.location.reload();
  };

  const acceptOrder = () => {
    fetch(`/api/orders/${id}/dasher`, {
      method: "PATCH",
      body: JSON.stringify({
        dasher: data.id,
      }),
    }).then((res) => {
      res.json().then((responseData) => {
        console.log("responseData", responseData.order);
        setOrder(responseData.order);
      });
    });
  };

  const deleteOrder = () => {
    fetch(`/api/orders/${id}`, {
      method: "DELETE",
    }).then((res) => {
      res.json().then((responseData) => {
        console.log("responseData", responseData.order);
        setOrder(responseData.order);
      });
    });
  };

  useEffect(() => {
    if (order) {
      if (order.OrderStatus[0].orderedAt) {
        setOrderStatus("Ordered");
      }
      if (order.OrderStatus[0].acceptedAt) {
        setOrderStatus("Accepted");
      }
      if (order.OrderStatus[0].placedAt) {
        setOrderStatus("Placed");
      }
      if (order.OrderStatus[0].pickedUpAt) {
        setOrderStatus("Picked Up");
      }
      if (order.OrderStatus[0].deliveredAt) {
        setOrderStatus("Delivered");
      }
    }
  }, [order]);

  if (loading) {
    return "Loading user info...";
  }

  // if( data ){
  // 	return( <DasherOrderPage order = {orderInfo} />)
  // }
  if (order) {
    return (
      <section className="mt-8">
        <div>
          <div className="text-center">
            <SectionHeaders
              mainHeader={`Order for ${order.user.name ? order.user.name : order.user.email}`}
            />
            <span> Current status: {orderStatus} </span>
            <span>
              {" "}
              {!order.isActive && (
                <div className="text-[20px] font-bold ">CANCELLED</div>
              )}{" "}
            </span>
            <br />
            {data.isDasher && !order.dasher ? (
              <div
                className="text-primary cursor-pointer "
                onClick={() => acceptOrder()}
              >
                ACCEPT ORDER
              </div>
            ) : (
              <> </>
            )}
            {order.userId === data.id && order.isActive ? (
              <div
                className="text-primary cursor-pointer "
                onClick={() => deleteOrder()}
              >
                CANCEL ORDER
              </div>
            ) : (
              <> </>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center md:items-start  md:flex-row">
          <div className=" md:w-[50%] p-5 ">
            <div className="text-center">
              <SectionHeaders subHeader="Items" />
            </div>
            {order.items.map((item) => (
              <div
                className="flex items-center justify-between border-b py-4"
                key={item.id}
              >
                <div className="">
                  <h3 className="font-semibold">{item.name}</h3>
                </div>
                <div className="text-lg font-semibold">${item.price}</div>
              </div>
            ))}
            <div className="flex items-center gap-4 border-b py-4">
              <div className="grow">
                <h3 className="font-semibold">Delivery Fee</h3>
                <div className="w-24" />
              </div>
              <div className="text-lg font-semibold">$3</div>
            </div>
            <div className="flex items-center gap-4 border-b py-4">
              <div className="w-24" />
              <div className="grow">
                <h3 className="font-semibold">Total</h3>
                <div className="w-24" />
              </div>
              <div className="text-lg font-semibold">
                ${parseInt(order.price) + 3}
              </div>
            </div>
          </div>

          <div className=" md:w-[50%] p-5 ">
            <div>
              <div className="text-center">
                <SectionHeaders subHeader="Delivery Information" />
              </div>
              <div className="flex justify-center w-[80%] ml-auto mr-auto my-4 ">
                From: {order.location.name}
                <br />
                To: {order.destinationDorm} - {order.destinationRoom}
                <br />
                For: {order.user.name}, {order.user.email}, {order.user.phone}
                <br />
                Orderer Venmo: {order.userVenmo}
                <br />
                {order.dasher && <>Dasher Venmo: {order.dasher.venmo} </>}
              </div>
            </div>
            <div>
              <div className="text-center">
                <SectionHeaders subHeader="Special Instructions" />
              </div>
              <div className="flex justify-center w-[80%] ml-auto mr-auto my-4 ">
                {order.specialInstructions}
              </div>
            </div>
          </div>
        </div>
        <DasherOrderControls
          order={order}
          id={id}
          update={() => update()}
          admin={data.isAdmin || data.isDasher}
        />
      </section>
    );
  }
}
