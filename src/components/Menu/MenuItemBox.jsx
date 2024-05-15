import AddToCartButton from "@/components/Menu/AddToCartButton";
import { Image } from "cloudinary-react";

const MenuItemBox = ({ onAddToCart, ...item }) => {
  const { name, description, basePrice, sizes, extraIngredientPrices, imageURL } = item;

  const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0;

  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/40 transition-all">
      <div className="flex items-center justify-center">
        <Image
          cloudName="duyvi6pzk"
          publicId={imageURL}
          className="w-32 h-32 rounded-full mt-2 overflow-hidden"
        />
      </div>
      <h4 className="font-semibold text-xl my-3">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      <AddToCartButton hasSizesOrExtras={hasSizesOrExtras} onClick={onAddToCart} basePrice={basePrice} />
    </div>
  );
};

export default MenuItemBox;