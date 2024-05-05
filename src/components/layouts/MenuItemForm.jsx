"use client";

import { useEffect, useState } from "react";
import {Image} from "cloudinary-react";
import MenuItemPriceProperties from "@/components/layouts/MenuItemPriceProperties";
import DeleteButton from "../DeleteButton";

export default function MenuItemForm({ onSubmit, menuItem, handleDeleteClick }) {
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(menuItem?.category || "");
  const [imageURL, setImageURL] = useState(menuItem?.imageURL || "");

  useEffect(() => {
    fetch('/api/Categories').then(res => {
      res.json().then(categories => {
        setCategories(categories);
      });
    })
  }, []);

  console.log(imageURL);

  const uploadImage = async (ev) => {
    const files = ev.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "n19id3qw");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/duyvi6pzk/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();

    setImageURL(file.secure_url);
  };

  return (
    <form
      onSubmit={(ev) => onSubmit(ev, { name, description, basePrice, sizes, extraIngredientPrices, category, imageURL })}
      className="mt-8 max-w-2xl mx-auto"
    >
      <div
        className="grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        {!imageURL && (
          <div className="flex items-center justify-center w-full mt-2">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-3">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <div className="mb-2 text-sm text-gray-500 dark:text-gray-400 flex flex-col gap-0.5 justify-center items-center">
                  <span>Upload</span>
                  <span>Item photo</span>
                </div>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={uploadImage}/>
            </label>
          </div>
        )}
        {imageURL && (
          <div className="flex flex-col items-center gap-2 justify-between">
            <Image
              cloudName="duyvi6pzk"
              publicId={imageURL}
              className="w-32 h-32 rounded-full mt-2"
            />
            <button
              className="w-20 h-10 flex items-center justify-center text-sm"
              onClick={() => setImageURL("")}
            >
              Remove
            </button>
          </div>
        )}
        <div className="grow">
          <label>Menu Item Name</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label>Category</label>
          <select value={category} onChange={ev => setCategory(ev.target.value)}>
            {categories?.length > 0 && categories.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
          <label>Base Price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
          />
          <MenuItemPriceProperties
            name={"Sizes"}
            addLabel={"Add item size"}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProperties
            name={"Extra ingredients"}
            addLabel={"Add ingredients prices"}
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices}
          />
          <button type="submit" className="mb-2 hover:bg-blue-400">Save</button>
          <DeleteButton label={"Delete this menu item"} onDelete={handleDeleteClick}/>
        </div>
      </div>
    </form>
  );
};