"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const UserTabs = ({ isadmin }) => {
  const path = usePathname();
  return (
    <>
      <div className="flex mx-auto gap-3 tabs justify-center flex-wrap">
        <Link
          className={path === "/profile" ? "active" : "hover:bg-slate-200"}
          href={"/profile"}
        >
          Profile
        </Link>
        {isadmin && (
          <>
            <Link
              className={
                path === "/categories" ? "active" : "hover:bg-slate-200"
              }
              href={"/categories"}
            >
              Categories
            </Link>
            <Link
              className={
                path.includes("menuitems") ? "active" : "hover:bg-slate-200"
              }
              href={"/menuitems"}
            >
              Menu Items
            </Link>
          </>
        )}
        <Link
          className={path.includes("orders") ? "active" : "hover:bg-slate-200"}
          href={"/orders"}
        >
          {isadmin ? "Total Orders" : "Your Orders"}
        </Link>
      </div>
    </>
  );
};