"use client";

import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import MenuItemPriceProperties from "@/components/layouts/MenuItemPriceProperties";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(menuItem?.category || "");

  useEffect(() => {
    fetch('/api/Categories').then(res => {
      res.json().then(categories => {
        setCategories(categories);
      });
    })
  }, []);

  return (
    <form
      onSubmit={(ev) => onSubmit(ev, { name, description, basePrice, sizes, extraIngredientPrices, category })}
      className="mt-8 max-w-2xl mx-auto"
    >
      <div
        className="grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div>
          <Image
            src={"/pizza.png"}
            width={128}
            height={128}
            alt="avatar"
            className="mx-auto rounded-full "
          />
        </div>
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
              <option value={c._id}>{c.name}</option>
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
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
