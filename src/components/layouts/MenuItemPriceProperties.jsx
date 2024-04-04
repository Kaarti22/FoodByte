"use client";

import Trash from "@/components/Icons/Trash";
import Plus from "@/components/Icons/Plus";
import ChevronDown from "@/components/Icons/ChevronDown";
import ChevronUp from "@/components/Icons/ChevronUp";
import { useState } from "react";

export default function MenuItemPriceProperties({
  name,
  addLabel,
  props,
  setProps,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const addProp = () => {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  };

  const editProp = (ev, index, property) => {
    const newValue = ev.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][property] = newValue;
      return newSizes;
    });
  };

  const removeProp = (indexToRemove) => {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  };
  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button type="button" className="inline-flex p-1 border-0 justify-start" onClick={() => setIsOpen(prev => !prev)}>
        {isOpen && <ChevronUp />}
        {!isOpen && <ChevronDown />}
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        {props?.length > 0 &&
          props.map((size, index) => (
            <div key={index} className="flex items-end gap-2">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Size name"
                  value={size.name}
                  onChange={(ev) => editProp(ev, index, "name")}
                />
              </div>
              <div>
                <label>Extra price</label>
                <input
                  type="text"
                  placeholder="Extra price"
                  value={size.price}
                  onChange={(ev) => editProp(ev, index, "price")}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="bg-white mb-2 px-2"
                  onClick={() => removeProp(index)}
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        <button
          type="button"
          onClick={addProp}
          className="bg-white items-center"
        >
          <Plus className="w-4 h-4" />
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
}
