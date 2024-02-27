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
  });
  const [instructions, setInstructions] = useState("");
  const { data: profileData } = useProfile();
  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);

  const test2 = () => {
    console.log(instructions);
  };

  useEffect(test2, [instructions]);

  useEffect(() => {
    if (profileData?.roomNumber) {
      const { phone, roomNumber, dorm } = profileData;
      setAddress({ phone, roomNumber, dorm });
    }
  }, [profileData]);

  function handleRemoveFromCart(index) {
    removeCartProduct(index);
    toast.success("Item removed from cart");
  }

  let subtotal = 0;
  cartProducts.forEach((p) => {
    subtotal += cartProductPrice(p);
  });

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({
      ...prevAddress,
      [propName]: value,
    }));
  }

  function initiateCheckout(ev) {
    ev.preventDefault();
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
      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length === 0 ? (
            <div>No products in your shopping cart</div>
          ) : (
            cartProducts.map((product, index) => (
              <div
                className="flex items-center gap-4 border-b py-4"
                // eslint-disable-next-line react/no-array-index-key
                key={index}
              >
                <div className="w-24">
                  {/* Image component can be uncommented and used as needed */}
                  {/* <Image src={product.image} alt={product.name} width={240} height={240} /> */}
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
                    onClick={() => handleRemoveFromCart(index)}
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))
          )}
          <div className="py-2 pr-16 flex justify-end items-center">
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
            <button type="submit" className="submit-order-button">
              Submit Order
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
