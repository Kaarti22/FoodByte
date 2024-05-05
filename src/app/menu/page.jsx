"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import SectionHeaders from "@/components/layouts/SectionHeaders";
import MenuItem from "@/components/Menu/MenuItem";
import { useEffect, useState } from "react";

const MenuPage = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/Categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
    fetch("/api/menuitems").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  return (
    <section className="mt-8">
      {categories?.length > 0 &&
        categories.map((c) => {
          if (c.name !== "Select Any....") {
            return (
              <Accordion key={c._id} type="single" className="mt-2 p-2" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="text-center">
                      <SectionHeaders mainHeader={c.name} />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
                      {menuItems
                        .filter((m) => m.category === c._id)
                        .map((item) => (
                          <MenuItem {...item} key={item._id}/>
                        ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          }
        })}
    </section>
  );
};

export default MenuPage;
