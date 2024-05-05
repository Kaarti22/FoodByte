"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserTabs } from "@/components/layouts/UserTabs";
import UserForm from "@/components/layouts/UserForm";

export default function ProfilePage() {
  const session = useSession();
  const [user, setUser] = useState(null);
  const [isadmin, setIsAdmin] = useState(false);
  const [isowner, setIsOwner] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const { status } = session;

  const router = useRouter();

  // console.log(user);
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setUser(data);
          setIsAdmin(data.admin);
          setIsOwner(data.owner);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdated(ev, data) {
    ev.preventDefault();
    console.log(data);
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log(response);
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile Updated!",
      error: "Error!",
    });
  }

  if (status === "loading" || !profileFetched) {
    return "Loading Profile...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="mt-8">
      <UserTabs isadmin={isadmin} isowner={isowner} />
      <div className="max-w-2xl mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileInfoUpdated} />
      </div>
    </section>
  );
}