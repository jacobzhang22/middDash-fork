/* eslint-disable */
/* eslint-disable no-return-assign */

"use client";

import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import { useRouter } from "next/navigation";
import useProfile from "@/components/UseProfile";
import PaymentPopup from "@/components/PaymentPopup";

export default function CartPage() {
  const { cartProducts, removeCartProduct, clearCart } =
    useContext(CartContext);
  const router = useRouter();
  const [address, setAddress] = useState({
    phone: "",
    roomNumber: "",
    dorm: "",
    venmo: "",
  });
  const [instructions, setInstructions] = useState("");
  const { data: profileData } = useProfile();
  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);
  const [isOrderFrozen, setIsOrderFrozen] = useState(false);

  const test2 = () => {
    console.log(instructions);
  };

  useEffect(test2, [instructions]);

  useEffect(() => {
    console.log("profile", profileData);
    if (profileData?.roomNumber) {
      handleAddressChange("roomNumber", profileData.roomNumber);
    }
    if (profileData?.dorm) {
      handleAddressChange("dorm", profileData.dorm);
    }
    if (profileData?.phone) {
      handleAddressChange("phone", profileData.phone);
    }
    if (profileData?.venmo) {
      handleAddressChange("venmo", profileData.venmo);
    }

    fetch("/api/admin-controls")
      .then((res) => {
        res.json().then((data) => {
          setIsOrderFrozen(data.orderFreeze);
        });
      })
      .catch((error) => {
        console.error("Error fetching order freeze state:", error);
        toast.error("Failed to fetch order freeze state.");
      });
  }, [profileData]);

  function handleRemoveFromCart(index) {
    removeCartProduct(index);
    toast.success("Item removed from cart");
  }

  let subtotal = 0;
  cartProducts.forEach((product) => {
    subtotal += cartProductPrice(product);
  });
  let finaltotal = subtotal + 5;

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({
      ...prevAddress,
      [propName]: value,
    }));
  }

  function initiateCheckout(ev) {
    ev.preventDefault();
    if (isOrderFrozen) {
      toast.error(
        "Order submissions are currently frozen. Please try again later.",
      );
      return;
    }
    setShowCheckoutPopup(true);
  }

  async function confirmCheckout() {
    setShowCheckoutPopup(false);

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address,
        cartProducts,
        instructions,
      }),
    });

    const { data } = await response.json();
    if (data) {
      clearCart();
      router.push(`/orders/${data.id}`);
      toast.success("Order submitted successfully!");
    } else {
      toast.error("Failed to submit order. Please try again.");
    }
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 flex flex-col md:flex-row md:space-x-10 space-y-5 md:space-y-0 justify-center   ">
        <div className=" md:flex-row bg-gray-100 md:bg-white px-5 rounded-lg">
          {cartProducts?.length === 0 ? (
            <div>No products in your shopping cart</div>
          ) : (
            cartProducts.map((product, index) => (
              <div
                className="flex items-center justify-between border-b py-4"
                // eslint-disable-next-line react/no-array-index-key
                key={index}
              >
                <div className=" w-[200px]">
                  <h3 className="font-semibold">{product.name}</h3>
                </div>
                <div className="text-lg font-semibold">
                  ${cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <button
                    className="p-2"
                    type="button"
                    onClick={() => handleRemoveFromCart(index)}
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))
          )}
          <div className=" py-2 md:pr-16 flex justify-between md:justify-end items-center px-5 ">
            <div className="text-gray-500">
              Subtotal:
              <br />
              Delivery:
              <br />
              Total:
            </div>
            <div className="text-lg font-semibold pl-2 text-right">
              ${subtotal}
              <br />
              $5.00
              <br />${(subtotal += 5)}
            </div>
          </div>
          <textarea
            placeholder="Special Instructions"
            value={instructions}
            onChange={(ev) => setInstructions(ev.target.value)}
          />
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={initiateCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <button
              type="submit"
              className={`submit-order-button ${cartProducts.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={
                isOrderFrozen ||
                cartProducts.length === 0 ||
                address.venmo === "" ||
                address.dorm === "" ||
                (address.phone === "" && address.roomNumber == "")
              }
            >
              {isOrderFrozen
                ? "Orders Temporarily Frozen"
                : address.venmo !== "" &&
                    address.dorm !== "" &&
                    address.phone !== "" &&
                    address.roomNumber !== ""
                  ? "Submit order"
                  : "Please fill out info"}
            </button>
          </form>
        </div>
      </div>
      {showCheckoutPopup && (
        <PaymentPopup onConfirm={confirmCheckout} subtotal={subtotal} />
      )}
    </section>
  );
}
