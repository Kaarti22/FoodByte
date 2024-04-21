"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const UserTabs = ({ isadmin }) => {
  const path = usePathname();
  return (
    <div className="flex mx-auto gap-3 tabs justify-center">
      <Link className={path === "/profile" ? "active" : "hover:bg-slate-200"} href={"/profile"}>
        Profile
      </Link>
      {isadmin && (
        <>
          <Link
            className={path === "/categories" ? "active" : "hover:bg-slate-200"}
            href={"/categories"}
          >
            Categories
          </Link>
          <Link
            className={path.includes("menuitems") ? "active" : "hover:bg-slate-200"}
            href={"/menuitems"}
          >
            Menu Items
          </Link>
        </>
      )}
    </div>
  );
};
