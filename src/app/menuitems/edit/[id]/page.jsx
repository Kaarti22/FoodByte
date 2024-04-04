"use client";
import { useProfile } from "@/components/UseProfile";
import { UserTabs } from "@/components/layouts/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Left from "@/components/Icons/left";
import { redirect, useParams } from "next/navigation";
import MenuItemForm from "@/components/layouts/MenuItemForm";

export default function EditMenuItemPage() {
  const {id} = useParams();
  const [menuItem, setMenuItem] = useState(null);
  const { loading, data } = useProfile();
  const [redirectToItems, setRedirectToItems] = useState(false);

  useEffect(() => {
    fetch('/api/menuitems').then(res => {
      res.json().then(items => {
        const item = items.find(i => i._id === id);
        setMenuItem(item);
      });
    });
  }, []);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = {...data, _id: id};
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menuitems", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving Menu Items Info...",
      success: "Menu Items Updated!",
      error: "Error!..",
    });

    setRedirectToItems(true);
  }

  if(redirectToItems){
    return redirect('/menuitems');
  }

  if (loading) return "Loading user info...";

  if (!data.admin) return "Not Admin";

  return (
    <section className="mt-8">
      <UserTabs isadmin={true} />
      <div className="max-w-md mx-auto mt-8">
        <Link href="/menuitems" className="button">
          <Left />
          <span>Show All Menu Items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit}/>
    </section>
  );
}