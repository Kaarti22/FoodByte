"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../AppContext";
import ShoppingCart from "@/components/Icons/ShoppingCart";
import Bars2 from "./../Icons/Bars2";

function AuthLinks({ status, userName }) {
  if (status === "authenticated") {
    return (
      <main className="max-md:flex-col flex gap-2 items-center">
        <Link
          href={"/profile"}
          className="whitespace-nowrap hover:bg-slate-200 px-4 py-2 rounded-full"
        >
          Hello, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-primary rounded-full text-white px-8 py-2 hover:bg-blue-400"
        >
          Logout
        </button>
      </main>
    );
  }

  if (status !== "authenticated") {
    return (
      <main className="flex gap-2 items-center">
        <Link
          href={"/login"}
          className="hover:bg-slate-200 px-4 py-2 rounded-full"
        >
          Login
        </Link>
        <Link
          href={"/register"}
          className="bg-primary rounded-full text-white px-8 py-2 hover:bg-blue-400"
        >
          Register
        </Link>
      </main>
    );
  }
}

export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setUser(data);
          setIsOwner(data.owner);
        });
      });
    }
  }, [session, status]);

  const { cartProducts } = useContext(CartContext);

  return (
    <header className="">
      <div className="flex block items-center md:hidden justify-between">
        <Link className="text-primary font-semibold text-2xl" href={"/"}>
          FOOD BYTE
        </Link>
        <div className="flex gap-8 items-center">
          <Link href={"/cart"} className="relative">
            <ShoppingCart />
            {cartProducts.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs p-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
          <button
            className="p-1 border"
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            <Bars2 />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div 
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center"  
          onClick={() => setMobileNavOpen(false)}>
          <Link
            href={"/menu"}
            className="hover:bg-slate-200 rounded-full py-2 px-4"
          >
            Menu
          </Link>
          <Link
            href={"/#about"}
            className="hover:bg-slate-200 rounded-full py-2 px-4"
          >
            About
          </Link>
          <Link
            href={"/#contact"}
            className="hover:bg-slate-200 rounded-full py-2 px-4"
          >
            Contact
          </Link>
          {isOwner && (
            <Link
              href={"/dashboard"}
              className="hover:bg-slate-200 rounded-full py-2 px-4"
            >
              Dashboard
            </Link>
          )}
          <AuthLinks status={status} userName={userName} />
        </div>
      )}
      <div className="hidden md:flex items-center justify-between">
        <nav className="flex items-center gap-2 text-gray-500 font-semibold">
          <Link className="text-primary font-semibold text-2xl" href={"/"}>
            FOOD BYTE
          </Link>
          <Link
            href={"/menu"}
            className="hover:bg-slate-200 rounded-full py-2 px-4"
          >
            Menu
          </Link>
          <Link
            href={"/#about"}
            className="hover:bg-slate-200 rounded-full py-2 px-4"
          >
            About
          </Link>
          <Link
            href={"/#contact"}
            className="hover:bg-slate-200 rounded-full py-2 px-4"
          >
            Contact
          </Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          {isOwner && (
            <Link
              href={"/dashboard"}
              className="hover:bg-slate-200 rounded-full py-2 px-4"
            >
              Dashboard
            </Link>
          )}
          <AuthLinks status={status} userName={userName} />
          <Link href={"/cart"} className="relative">
            <ShoppingCart />
            {cartProducts.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs p-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
