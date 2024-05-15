import { CartProductPrice } from "../AppContext";
import Trash from "@/components/Icons/Trash";
import { Image } from "cloudinary-react";

export default function CartProduct({ index, product, onRemove }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 border-b py-4 items-center">
      <div className="w-full md:w-24 flex justify-center">
        <Image
          cloudName="duyvi6pzk"
          publicId={product?.imageURL}
          className="w-16 h-16 rounded-full mt-2 overflow-hidden"
        />
      </div>
      <div className="grow">
        <h3 className="font-semibold text-center md:text-left">{product.name}</h3>
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
      <div className="text-lg font-semibold text-center md:text-left md:ml-auto md:mr-4">
        ₹{CartProductPrice(product)}
      </div>
      {!!onRemove && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="p-2 w-10 ml-2 flex justify-center"
        >
          <Trash />
        </button>
      )}
    </div>
  );
}
