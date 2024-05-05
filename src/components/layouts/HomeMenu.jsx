"use client";

import Image from "next/legacy/image";
import MenuItem from "../Menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";
import BestSellers from "@/components/layouts/BestSellers";

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
      <BestSellers/>
    </section>
  );
}