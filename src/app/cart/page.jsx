"use client";

import { CartContext, CartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layouts/SectionHeaders";
import Image from "next/legacy/image";
import { useContext, useEffect, useState } from "react";
import Trash from "@/components/Icons/Trash";
import AddressInputs from "@/components/layouts/AddressInputs";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";
import CartProduct from "@/components/Menu/CartProduct";

export default function CartPage() {
  const { cartProducts, removeCartProd } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment failed 😔", { id: 11 });
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phoneno, streetaddress, pincode, city, country } = profileData;
      const addressFromProfile = {
        phoneno,
        streetaddress,
        pincode,
        city,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  function handleAddressChange(propName, value) {
    setAddress((prev) => ({ ...prev, [propName]: value }));
  }

  async function proceedToCheckout(ev) {
    ev.preventDefault();
    if (profileData.email === undefined) {
      toast.error("Please login to checkout");
      return;
    }
    const promise = new Promise((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: "Preparing your order...",
      success: "Redirecting to payment...",
      error: "Something went wrong... Please try again later",
    });
  }

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += CartProductPrice(p);
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders
          mainHeader={"Cart"}
          subHeader={"Order within seconds"}
        />
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {cartProducts?.length === 0 && <div>No products in your cart</div>}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <CartProduct
                key={index}
                index={index}
                product={product}
                onRemove={removeCartProd}
              />
            ))}
          <div className="py-2 pr-16 flex justify-between items-center md:justify-end">
            <div className="text-gray-500">
              Subtotal:
              <br />
              Delivery:
              <br />
              Total:
            </div>
            <div className="text-lg font-semibold pl-2 text-right">
              ₹{subtotal}
              <br />
              ₹5
              <br />₹{subtotal + 5}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-blue-600 font-semibold text-lg text-center md:text-left">
            Checkout
          </h2>
          <form className="mt-4 md:mt-0" onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProp={address}
              setAddressProp={handleAddressChange}
            />
            <button
              type="submit"
              className="block w-full md:w-auto bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 mt-4"
            >
              Pay ₹{subtotal + 5}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
