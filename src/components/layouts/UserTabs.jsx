"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const UserTabs = ({ isadmin }) => {
  const path = usePathname();
  // console.log(path);
  return (
    <div className="flex mx-auto gap-3 tabs justify-center">
      <Link 
        className={path === '/profile' ? 'active' : ''} 
        href={"/profile"}
      >
        Profile
        </Link>
      {isadmin && (
        <>
          <Link className={path === '/categories' ? 'active' : ''} href={'/categories'}>Categories</Link>
          <Link className={path.includes('menuitems') ? 'active' : ''} href={'/menuitems'}>Menu Items</Link>
          <Link className={path === '/users' ? 'active' : ''} href={'/users'}>Users</Link>
        </>
      )}
    </div>
  );
}
