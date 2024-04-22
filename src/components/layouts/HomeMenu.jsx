"use client";

import Image from "next/legacy/image";
import MenuItem from "../Menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    console.log("setBestSellers");
    fetch("/api/menuitems")
      .then((res) => {
      res.json().then((data)=>{
        setBestSellers(data)
      })
        
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
      <div className="grid grid-cols-3 gap-4">
        {bestSellers?.length > 0 &&
          bestSellers.map((item,k) => <MenuItem {...item} key={k}/>)
        }
      </div>
    </section>
  );
}
