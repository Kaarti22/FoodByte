"use client";
import { useProfile } from "@/components/UseProfile";
import { UserTabs } from "@/components/layouts/UserTabs";
import Link from "next/link";
import Right from "@/components/Icons/Right";
// import Image from "next/legacy/image";
import { Image } from "cloudinary-react";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const { loading, data } = useProfile();
  let imageURL = "";

  useEffect(() => {
    fetch("/api/menuitems").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return "Loading User Info...";
  }
  if (!data.admin) {
    return "Not Admin";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isadmin={true} />
      <div className="mt-8">
        <Link className="button hover:bg-slate-200" href="/menuitems/new">
          Create new menu item
          <Right />
        </Link>
      </div>
      <div>
        <div className="grid grid-cols-3 gap-2 mt-8">
          {menuItems?.length > 0 &&
            menuItems.map((item) => {
              imageURL = item?.imageURL;
              return (
                <Link
                  key={item._id}
                  href={"menuitems/edit/" + item._id}
                  className="bg-gray-200 rounded-lg p-4 flex flex-col justify-center items-center"
                >
                  <Image
                    cloudName="duyvi6pzk"
                    publicId={imageURL}
                    className="w-20 h-20 rounded-full m-2"
                  />
                  <div className="text-center mt-1">{item.name}</div>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
}
