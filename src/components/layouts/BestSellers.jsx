"use client";

import React, { useEffect, useState } from "react";
import MenuItem from "../Menu/MenuItem";

const BestSellers = () => {
  const bestSellersIds = [
    "6635e53c631d02df1eae9851",
    "6635e221631d02df1eae92af",
    "663503f1030e02bf86ecb142",
    "66352c414540f135d4db7465",
    "6635deec631d02df1eae8d73",
    "6635e3e6631d02df1eae962f",
  ];
  const [menuItems, setMenuItems] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    fetch("/api/menuitems").then((res) => {
      res.json().then((data) => {
        setMenuItems(data);
      });
    });
  }, []);

  useEffect(() => {
    const filteredItems = menuItems.filter((item) =>
      bestSellersIds.includes(item._id)
    );
    setBestSellers(filteredItems);
  }, [menuItems]);

  return <div className="grid sm:grid-cols-3 gap-4">
    {bestSellers?.length > 0 &&
      bestSellers.map((item, k) => <MenuItem {...item} key={item._id} />)}
  </div>;
};

export default BestSellers;
