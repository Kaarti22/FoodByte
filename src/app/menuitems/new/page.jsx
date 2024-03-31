"use client";
import { useProfile } from "@/components/UseProfile";
import { UserTabs } from "@/components/layouts/UserTabs";
import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Left from "@/components/Icons/left";
import { redirect } from "next/navigation";

export default function NewMenuItem() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const { loading, data } = useProfile();
  const [redirectToItems, setRedirectToItems] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    const data = { name, description, basePrice };
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
      <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
        <div
          className="grid items-start gap-4"
          style={{ gridTemplateColumns: ".3fr .7fr" }}
        >
          <div>
            <Image
              src={"/pizza.png"}
              width={128}
              height={128}
              alt="avatar"
              className="mx-auto rounded-full "
            />
          </div>
          <div className="grow">
            <label>Menu Item Name</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
            <label>Base Price</label>
            <input
              type="text"
              value={basePrice}
              onChange={(ev) => setBasePrice(ev.target.value)}
            />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </section>
  );
}
