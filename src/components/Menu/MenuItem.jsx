import { useContext, useState } from "react";
import MenuItemBox from "@/components/Menu/MenuItemBox";
import { Image } from "cloudinary-react";
import { CartContext } from "../AppContext";

export default function MenuItem(menuItem) {
  const {
    name,
    description,
    basePrice,
    sizes,
    extraIngredientPrices,
    imageURL,
  } = menuItem;

  const { addToCart } = useContext(CartContext);

  const [showPopup, setShowPopup] = useState(false);
  const [selectSize, setSelectSize] = useState(sizes?.[0] || null);
  const [selectExtras, setSelectExtras] = useState([]);

  const handleAddToCart = async () => {
    if ((sizes?.length > 0 || extraIngredientPrices?.length > 0) && !showPopup) {
      setShowPopup(true);
    } else {
      addToCart(menuItem, selectSize, selectExtras);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowPopup(false);
    }
  };

  const handleExtras = (ev, extraThing) => {
    const checked = ev.target.checked;
    if (checked) {
      setSelectExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectExtras((prev) => prev.filter((e) => e.name !== extraThing.name));
    }
  };

  let selectedPrice = 0;
  if (selectSize) {
    selectedPrice += selectSize.price;
  }
  if (selectExtras?.length > 0) {
    for (const extra of selectExtras) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="my-8 bg-white p-2 rounded-lg max-w-md" onClick={(ev) => ev.stopPropagation()}>
            <div className="overflow-y-scroll p-2" style={{ maxHeight: "calc(100vh - 100px)" }}>
              <div className="flex justify-center items-center">
                <Image
                  cloudName="duyvi6pzk"
                  publicId={imageURL}
                  className="w-32 h-32 rounded-full mt-2 overflow-hidden"
                />
              </div>
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
              {sizes?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Pick your size</h3>
                  {sizes.map((size) => (
                    <label key={size._id} className="flex items-center gap-2 p-2 border rounded-md mb-1 font-thin">
                      <input
                        type="radio"
                        name="size"
                        onChange={() => setSelectSize(size)}
                        checked={selectSize?.name === size.name}
                      />
                      {size.name} ₹{size.price}
                    </label>
                  ))}
                </div>
              )}
              {extraIngredientPrices?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Any extras?</h3>
                  {extraIngredientPrices.map((extraThing) => (
                    <label key={extraThing._id} className="flex items-center gap-2 p-2 border rounded-md mb-1 font-thin">
                      <input
                        type="checkbox"
                        name={extraThing.name}
                        onChange={(ev) => handleExtras(ev, extraThing)}
                        checked={selectExtras.map((e) => e._id).includes(extraThing._id)}
                      />
                      {extraThing.name} +₹{extraThing.price}
                    </label>
                  ))}
                </div>
              )}

              <div>
                <button type="button" className="primary w-full hover:bg-blue-400" onClick={handleAddToCart}>
                  Add to cart ₹{selectedPrice}
                </button>
              </div>
              <button className="mt-2 rounded-full w-full" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemBox onAddToCart={handleAddToCart} {...menuItem} />
    </>
  );
}
