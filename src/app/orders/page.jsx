"use client";
import SectionHeaders from "@/components/layouts/SectionHeaders";
import { UserTabs } from "@/components/layouts/UserTabs";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { dbTimeForHuman } from "./../../libs/timedate";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const session = useSession();
  const [user, setUser] = useState(null);
  const [isadmin, setIsAdmin] = useState(false);
  const [isowner, setIsOwner] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const { status } = session;

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

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    setLoadingOrder(true);
    fetch("/api/orders").then((res) => {
      res.json().then((orders) => {
        setOrders(orders.reverse());
        setLoadingOrder(false);
      });
    });
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isadmin={isadmin} isowner={isowner} />
      <div className="mt-8">
        {loadingOrder && <div>Loading Orders...</div>}
        {orders?.length > 0 &&
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6"
            >
              <div className="grow flex flex-col md:flex-row items-center gap-6">
                <div>
                  <div
                    className={
                      (order.paid ? "bg-green-500" : "bg-red-500") +
                      " p-2 rounded-lg text-teal-100 w-24 text-sm text-center"
                    }
                  >
                    {order.paid ? "paid" : "Not Paid"}
                  </div>
                </div>
                <div className="grow">
                  <div className="flex gap-2 items-center mb-1">
                    <div className="grow text-black text-sm">
                      {order.userEmail}
                    </div>
                    <div className="text-sm text-gray-500">
                      {dbTimeForHuman(order.createdAt)}
                    </div>
                  </div>
                  <div className="text-xs  text-zinc-500">
                    {order.cartProducts.map((p) => p.name).join(", ")}
                  </div>
                </div>
              </div>
              <div className="justify-end flex gap-4 items-center text-sm text-black whitespace-nowrap">
                <Link href={"/orders/" + order._id} className="button">
                  show more
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}