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
  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false
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
    <div className="flex items-center justify-between border-b border-gray-400 py-5">
      <Link className="text-primary font-semibold text-3xl" href="/">
        MIDD-DASH
        <pre className="text-gray-500 text-sm"> by MiddDev</pre>
      </Link>
      <div className=" flex space-x-10  ">
        <Link href="/cart" className="relative md:hidden flex">
          <ShoppingCart />
          <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
            {cartProducts.length}
          </span>
        </Link>
        <nav>
          <section className="MOBILE-MENU flex lg:hidden">
            <div
              className="HAMBURGER-ICON space-y-2"
              onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
            >
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600" />
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600" />
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600" />
            </div>

            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
              {" "}
              <div
                className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
                onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
              >
                <svg
                  className="h-8 w-8 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <ul
                className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]  "
                onClick={() => setIsNavOpen((prev) => !prev)}
              >
                <li className="border-b border-gray-400 my-8 uppercase">
                  <Link href="/">Home</Link>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase">
                  <Link href="/menu">Menu</Link>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase">
                  <Link href="/#about">About</Link>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase">
                  <Link href="/dash">Dash</Link>
                </li>
                {status === "authenticated" && (
                  <>
                    <li className="border-b border-gray-400 my-8 uppercase">
                      <Link href="/profile" className="whitespace-nowrap">
                        Hello, {userName}
                      </Link>
                    </li>
                    {/* eslint-disable-next-line react/button-has-type */}
                    <li className=" my-8 uppercase">
                      <button
                        type="button"
                        onClick={() => signOut()}
                        className="bg-primary rounded-full text-white px-8 py-2"
                      >
                        {" "}
                        Logout
                      </button>
                    </li>
                  </>
                )}
                {status === "unauthenticated" && (
                  <>
                    <li className="border-b border-gray-400 my-8 uppercase">
                      <Link href="/login">Login</Link>
                    </li>
                    <li className="border-b border-gray-400 my-8 uppercase">
                      <Link
                        href="/register"
                        className="bg-primary rounded-full text-white px-8 py-2"
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}
                <li className="border-b border-gray-400 my-8 uppercase">
                  <Link href="/cart" className="relative">
                    <ShoppingCart />
                    <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                      {cartProducts.length}
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </section>

          <ul className="DESKTOP-MENU items-center  hidden space-x-8 lg:flex">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/menu">Menu</Link>
            </li>
            <li>
              <Link href="/#about">About</Link>
            </li>
            <li>
              <Link href="/dash">Dash</Link>
            </li>
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
          </ul>
        </nav>
      </div>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </div>
  );
}
