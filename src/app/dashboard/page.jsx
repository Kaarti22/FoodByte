"use client";

import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import UpdateAdmin from "@/components/UpdateAdmin";

const ManagersPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  let { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/users").then((res) => {
      res.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);

  if (loading) {
    return "Loading list of restaurant owners...";
  }

  if (!data.admin) {
    return "Not an admin";
  }

  const handleAdmin = async (ev, userToEdit) => {
    ev.preventDefault();
    userToEdit.admin = !userToEdit.admin;
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userToEdit),
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(savingPromise, {
      loading: "Updating...",
      success: "User Updated!",
      error: "Error!",
    });
    router.refresh();
  };

  return (
    <div className="mt-8">
      <h1>Managers</h1>
      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div key={user._id} className="bg-gray-100 rounded-lg mb-2 p-3 px-10 flex items-center gap-4 justify-between">
              <span className="text-gray-500">{user.email}</span>
              <div>
                <UpdateAdmin label={user.admin ? "Manager" : "User"} onUpdate={handleAdmin} user={user}/>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ManagersPage;