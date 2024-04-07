"use client";

import { CartContext, CartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layouts/SectionHeaders";
import Image from "next/legacy/image";
import { useContext, useEffect, useState } from "react";
import Trash from "@/components/Icons/Trash";
import AddressInputs from "@/components/layouts/AddressInputs";
import { useProfile } from "@/components/UseProfile";

const CartPage = () => {
  const { cartProducts, removeCartProd } = useContext(CartContext);

  const [address, setAddress] = useState({});

  const {data: profileData} = useProfile();

  useEffect(() => {
    if(profileData?.city){
      const {phoneno, streetaddress, pincode, city, country} = profileData;
      const addressFromProfile = {
        phoneno, streetaddress, pincode, city, country
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  const handleAddressChange = (propName, value) => {
    setAddress(prev => ({...prev, [propName]:value}))
  }

  let total = 0;
  for (const p of cartProducts) {
    total += CartProductPrice(p);
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader={"Cart"} />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div>
          {cartProducts?.length === 0 && <div>No products in your cart</div>}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div className="flex gap-4 border-b py-4 items-center">
                <div className="w-24">
                  <Image
                    src={"/pizza.png"}
                    alt="Product image"
                    width={240}
                    height={240}
                  />
                </div>
                <div className="grow">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.size && (
                    <div className="text-sm text-gray-700">
                      Size: <span>{product.size.name}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-500">
                      Extras:
                      {product.extras.map((extra) => (
                        <div>
                          {extra.name} ${extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                  ${CartProductPrice(product)}
                </div>
                <button
                  type="button"
                  onClick={() => removeCartProd(index)}
                  className="p-2 w-10 ml-2"
                >
                  <Trash />
                </button>
              </div>
            ))}
          <div className="py-2 text-right pr-16">
            <span className="text-gray-500">Subtotal:</span>
            <span className="text-lg font-semibold pl-2">${total}</span>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form>
            <AddressInputs
              addressProp={address}
              setAddressProp={handleAddressChange}
            />
            <button type="submit">Pay ${total}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
