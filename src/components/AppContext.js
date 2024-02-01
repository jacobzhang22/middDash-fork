"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  const price = parseInt(cartProduct.price, 10);
  return price;
}

export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  function saveCartProductsToLocalStorage(newCartProducts) {
    if (ls) {
      ls.setItem("cart", JSON.stringify(newCartProducts));
    }
  }

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeCartProduct(indexToRemove) {
    setCartProducts((prevCartProducts) => {
      const newCartProducts = prevCartProducts.filter(
        (v, index) => index !== indexToRemove,
      );
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
  }

  function addToCart(product) {
    setCartProducts((prevProducts) => {
      const cartProduct = { ...product };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }

  function isValidCartProduct(product) {
    if (cartProducts.length === 0) {
      return true;
    }
    // Return true if product is from same location as other products in cart
    return cartProducts[0].locationId === product.locationId;
  }

  return (
    <SessionProvider>
      <CartContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{
          cartProducts,
          setCartProducts,
          isValidCartProduct,
          addToCart,
          removeCartProduct,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
