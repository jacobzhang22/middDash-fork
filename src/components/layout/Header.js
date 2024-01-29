"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart";

export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  const [userName, setUserName] = useState(userData?.name || userData?.email);
  const { cartProducts } = useContext(CartContext);

  useEffect(() => {
    if (userData) {
      if (userData?.name && userData.name.includes(" ")) {
        // eslint-disable-next-line prefer-destructuring
        setUserName(userData.name.split(" ")[0]);
      } else {
        // eslint-disable-next-line prefer-destructuring
        setUserName(userData.email.split("@")[0]);
      }
    }
  }, [userData]);

  return (
    <header className="flex items-center justify-between">
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link className="text-primary font-semibold text-2xl" href="/">
          MIDD-DASH
        </Link>
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">Contact</Link>
        {userData && userData.isAdmin && <Link href="/admin">Admin</Link>}
      </nav>
      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        {status === "authenticated" && (
          <>
            <Link href="/profile" className="whitespace-nowrap">
              Hello, {userName}
            </Link>
            {/* eslint-disable-next-line react/button-has-type */}
            <button
              onClick={() => signOut()}
              className="bg-primary rounded-full text-white px-8 py-2"
            >
              {" "}
              Logout
            </button>
          </>
        )}
        {status === "unauthenticated" && (
          <>
            <Link href="/login">Login</Link>
            <Link
              href="/register"
              className="bg-primary rounded-full text-white px-8 py-2"
            >
              Register
            </Link>
          </>
        )}
        <Link href="/cart" className="relative">
          <ShoppingCart />
          <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
            {cartProducts.length}
          </span>
        </Link>
      </nav>
    </header>
  );
}
