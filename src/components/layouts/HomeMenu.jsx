"use client";

import Image from "next/legacy/image";
import MenuItem from "../Menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    fetch("/api/menuitems").then((res) => {
      res.json().then((data) => {
        setBestSellers(data.slice(0, 6));
      });
    });
  }, []);

  return (
    <section className="">
      <div className="text-center mb-4">
        <SectionHeaders
          subHeader={"Check Out"}
          mainHeader={"Our Best Sellers"}
        />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {bestSellers?.length > 0 &&
          bestSellers.map((item, k) => <MenuItem {...item} key={item._id} />)}
      </div>
    </section>
  );
}