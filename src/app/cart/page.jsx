"use client";

import { CartContext, CartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layouts/SectionHeaders";
import Image from "next/legacy/image";
import { useContext, useEffect, useState } from "react";
import Trash from "@/components/Icons/Trash";
import AddressInputs from "@/components/layouts/AddressInputs";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";
import  CartProduct  from '@/components/menu/CartProduct';

export default function CartPage() {
  const { cartProducts, removeCartProd } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Payment failed 😔');
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
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div>
          {cartProducts?.length === 0 && <div>No products in your cart</div>}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <CartProduct product={product} onRemove={removeCartProd}/>
              // <></>
            ))}
          <div className="py-2 pr-16 flex justify-end items-center">
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
        <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
          <h2 className="text-blue-600 font-semibold text-lg">Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProp={address}
              setAddressProp={handleAddressChange}
            />
            <button type="submit">Pay ₹{subtotal + 5}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
