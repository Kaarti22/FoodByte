"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardTabs = () => {
    const path = usePathname();
    return (
        <div className="flex mx-auto gap-3 tabs justify-center">
            <Link className={path === "/dashboard/managers" ? "active" : "hover:bg-slate-200"} href={"/dashboard/managers"}>
                Managers
            </Link>
        </div>
    )
};

export default DashboardTabs;