"use client";

import toast from "react-hot-toast";
import Userform from "@/components/layouts/UserForm";
import { useProfile } from "@/components/UseProfile";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardTabs from "@/components/layouts/DashboardTabs";

export default function EditUserPage() {
  const { loading, data } = useProfile();
  const [user, setUser] = useState(null);
  const {id} = useParams();

  useEffect(() => {
      fetch('/api/profile?_id=' + id).then(res => {
        res.json().then(user => {
          setUser(user);
        })
      })
  }, []);

  if (loading) {
    return "Loading user profile";
  }
  
  if (!data.admin) {
    return "Not an admin";
  }

  const handleSaveButtonClick = async (ev, data) => {
    ev.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
        const res = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({...data, _id: id}),
        })
        if(res.ok){
            resolve();
        } else {
            reject();
        }
    });
    toast.promise(promise, {
        loading: 'Saving user...',
        success: 'User saved',
        error: 'An error has occured while saving the user',
    })
  }
  
  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <DashboardTabs/>
      <div className="mt-8">
        <Userform user={user} onSave={handleSaveButtonClick}/>
      </div>
    </section>
  );
}
