"use client";
import { useProfile } from "@/components/UseProfile";
import { UserTabs } from "@/components/layouts/UserTabs";
import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Left from "@/components/Icons/left";
import { redirect } from "next/navigation";
import MenuItemForm from "@/components/layouts/MenuItemForm";

export default function NewMenuItem() {
  const { loading, data } = useProfile();
  const [redirectToItems, setRedirectToItems] = useState(false);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menuitems", {
        method: "POST",
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

  if (redirectToItems) {
    return redirect("/menuitems");
  }

  if (loading) return "Loading user info...";

  if (!data.admin) return "Not Admin";

  return (
    <section className="mt-8">
      <UserTabs isadmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href="/menuitems" className="button hover:bg-slate-200">
          <Left />
          <span>Show All Menu Items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
}
