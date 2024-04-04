"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {UserTabs} from '@/components/layouts/UserTabs';

export default function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [pincode, setPINcode] = useState('');
  const [streetaddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [isadmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const { status } = session;

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
    fetch('/api/profile').then((response) => {                                 
      response.json().then((data) => {
        setPhoneno(data.phoneno);
        setCity(data.city);
        setCountry(data.country);
        setPINcode(data.pincode);
        setStreetAddress(data.streetaddress);
        setIsAdmin(data.admin);
        setProfileFetched(true);
      });
    });
  }
  }, [session, status]);


  async function hadleProfileInfoUpdated(ev) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: userName,
          phoneno,
          streetaddress,
          city,
          country,
          pincode,
        }),
      });
      console.log(response)
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

  const userImage = session?.data?.user?.image;

  return (
    <section className="mt-8">
      <UserTabs isadmin={isadmin}/>
      <div className="max-w-2xl mx-auto mt-8">
        <div className="flex gap-2">
          <div>
            <div className="bg-gray-200 p-4 rounded-3xl">
              <Image
                src={userImage || "/Avatar.jpg"}
                width={128}
                height={128}
                alt="avatar"
                className="mx-auto rounded-full "
              />
            </div>
          </div>
          <form className="grow" onSubmit={ hadleProfileInfoUpdated}>
            <label>First And Last Name</label>
            <input
              type="text"
              placeholder="First and last Name"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              disabled={true}
              value={session.data.user.email}
              placeholder={'Email'}
            />
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneno}
              onChange={(ev) => setPhoneno(ev.target.value)}
            />
            <label>Street Address</label>
            <input
              type="text"
              placeholder="Street Address"
              value={streetaddress}
              onChange={(ev) => setStreetAddress(ev.target.value)}
            />
            <div className="flex gap-4">
              <div>
                <label>PIN Code</label>
                <input
                  type="text"
                  placeholder="PIN Code"
                  value={pincode}
                  onChange={(ev) => setPINcode(ev.target.value)}
                />
              </div>
              <div>
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                />
              </div>
            </div>
            <label>Country</label>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(ev) => setCountry(ev.target.value)}
            />
            <button type="submit" className="hover:bg-red-400 rounded-full">
              Save
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
