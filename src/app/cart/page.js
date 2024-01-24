/* eslint-disable */

"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import useProfile from "@/components/UseProfile";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({
    phone: "",
    roomNumber: "",
    dorm: "",
  });
  const [invalidSubmittion, setInvalidSubmittion] = useState(false);
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (profileData?.roomNumber) {
      const { phone, roomNumber, dorm } = profileData;
      const addressFromProfile = { phone, roomNumber, dorm };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  // calculate item cost
  let subtotal = 0;
  for (const p of cartProducts) {
    console.log(parseInt(p.price));
    subtotal += cartProductPrice(p);
  }

  function handleAddressChange(propName, value) {
    const newAddr = { ...address };
    newAddr[propName] = value;
    setAddress(newAddr);
  }

  async function proceedToCheckout(ev) {
    setInvalidSubmittion(false);
    ev.preventDefault();
    if (address.phone === "") {
      setInvalidSubmittion("Please enter your phone number");
      return;
    }
    if (address.roomNumber === "") {
      setInvalidSubmittion("Please enter your room number");
      return;
    }
    if (address.dorm === "") {
      setInvalidSubmittion("Please enter your dorm");
      return;
    }

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address,
        cartProducts,
      }),
    });
    const { data } = await response.json();
    if (data.id) {
      router.push(`/orders/${data.id}`);
    } else {
      setInvalidSubmittion("something went wrong");
    }

    console.log("data", data);
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div
                className="flex items-center gap-4 border-b py-4"
                key={index}
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
                  <h3 className="font-semibold">{product.name}</h3>
                </div>
                <div className="text-lg font-semibold">
                  ${cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <button
                    className="p-2"
                    type="button"
                    onClick={() => removeCartProduct(index)}
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          <div className="py-2 pr-16 flex justify-end items-center">
            <div className="text-gray-500">
              Subtotal:
              <br /> Delivery:
              <br /> Total:
            </div>
            <div className="text-lg font-semibold pl-2 text-right">
              ${subtotal}
              <br /> $5.00
              <br />${subtotal + 5}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <div className="py-4">
              When you submit your order, your order will be sent to all
              available dashers. If a dasher chooses to accept your request, you
              will be notified with the dashers Venmo, where you must send the
              requested total.
            </div>
            <button type="submit">I will pay ${subtotal + 5}</button>
            {invalidSubmittion && (
              <div className="text-center pt-4">{invalidSubmittion} </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
