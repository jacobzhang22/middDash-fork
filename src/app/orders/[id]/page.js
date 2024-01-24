"use client";

import { redirect, useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import Left from "@/components/icons/Left";
import useProfile from "@/components/UseProfile";
import MenuItemForm from "@/components/layout/MenuItemForm";
import DeleteButton from "@/components/DeleteButton";
import SectionHeaders from "@/components/layout/SectionHeaders";
import DasherOrderPage from "./DasherOrderPage.js";
import UserOrderPage from "./UserOrderPage.js";

export default function IndividualOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState();
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch(`/api/orders/${id}`).then((res) => {
      res.json().then((responseData) => {
        console.log("responseData", responseData.order);
        setOrder(responseData.order);
      });
    });
  }, []);

  // async function handleFormSubmit(ev, data) {
  //   console.log("submitting");
  //   ev.preventDefault();
  //   // eslint-disable-next-line no-param-reassign
  //   data = { ...data, id };
  //   const response = await fetch(`/api/menu-items/${id}`, {
  //     method: "PUT",
  //     body: JSON.stringify(data),
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   const parsedData = await response.json();
  //   setMenuItem(parsedData.item);

  //   // await toast.promise(savingPromise, {
  //   //   loading: "Saving item",
  //   //   success: "Saved",
  //   //   error: "Error",
  //   // });

  //   // setRedirectToItems(true);
  // }

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
            <div className="flex justify-center">
              From: {order.location.name}
              <br />
              To: {order.destinationDorm} - {order.destinationRoom}
            </div>
          </div>
        </div>
        {data.isDasher ? (
          <DasherOrderPage order={order} id={id} />
        ) : (
          <UserOrderPage order={order} />
        )}
      </section>
    );
  }
}
