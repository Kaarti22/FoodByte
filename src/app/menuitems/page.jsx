"use client";
import { useProfile } from "@/components/UseProfile";
import { UserTabs } from '@/components/layouts/UserTabs';
import Link from "next/link";
import Right from '@/components/Icons/Right';

export default function MenuItemsPage() {

  const {loading, data} = useProfile();

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
    </section>
  );
}
