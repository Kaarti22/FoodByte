"use client";
import { useProfile } from "@/components/UseProfile";
import { UserTabs } from '@/components/layouts/UserTabs';
import Link from "next/link";
import Right from '@/components/Icons/Right';
import Image from "next/legacy/image";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {

  const [menuItems, setMenuItems] = useState([]);
  const {loading, data} = useProfile();

  useEffect(() => {
    fetch('/api/menuitems').then(res => {
      res.json().then(menuItems => {
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
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isadmin={true}/>
      <div className="mt-8">
        <Link className='button' href='/menuitems/new'>
          Create new menu item
          <Right />
          </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">
          Edit menu item
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 && menuItems.map(item => (
            <Link href={'menuitems/edit/' + item._id} className="bg-gray-200 rounded-lg p-4">
              <div className="relative w-24 h-24">
                <Image src={item.image} alt={''} width={200} height={200} className="rounded-md"/>
              </div>
              <div className="text-center">
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
