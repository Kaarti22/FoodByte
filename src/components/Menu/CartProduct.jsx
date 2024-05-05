import { CartProductPrice } from "../AppContext";
import Trash from "@/components/Icons/Trash";
// import Image from "next/legacy/image";
import {Image} from "cloudinary-react";

export default function CartProduct({ product, onRemove }) {
  return (
    <div className="flex gap-4 border-b py-4 items-center">
      <div className="w-24">
        <Image
              cloudName="duyvi6pzk"
              publicId={product?.imageURL}
              className="w-16 h-16 rounded-full mt-2 overflow-hidden"
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
              <div key={extra.name}>
                {extra.name} ₹{extra.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold">₹{CartProductPrice(product)}</div>
      {!!onRemove && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="p-2 w-10 ml-2"
        >
          <Trash />
        </button>
      )}
    </div>
  );
}
