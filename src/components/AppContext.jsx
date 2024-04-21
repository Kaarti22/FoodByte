"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export const CartProductPrice = (cartProduct) => {
  let price = cartProduct.basePrice;
  if(cartProduct.size){
    price = cartProduct.size.price;
  }
  if(cartProduct.extras?.length > 0){
    for(const extra of cartProduct.extras){
      price += extra.price;
    }
  }
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

  const clearCart = () => {
    setCartProducts([]);
    saveCartProdToLocalStorage([]);
  };

  const removeCartProd = (indexToRemove) => {
    setCartProducts((prev) => {
      const newProducts = prev.filter((v, index) => index !== indexToRemove);
      saveCartProdToLocalStorage(newProducts);
      return newProducts;
    });
    toast.success('Product removed');
  };

  const saveCartProdToLocalStorage = (cartProducts) => {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  };

  const addToCart = (product, size = null, extras = []) => {
    setCartProducts((prevProducts) => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProdToLocalStorage(newProducts);
      return newProducts;
    });
  };

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          removeCartProd,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
