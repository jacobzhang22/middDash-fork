"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import UserForm from "@/components/layout/UserForm";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const [isOrderFrozen, setIsOrderFrozen] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      Promise.all([
        fetch("/api/profile").then((res) => res.json()),
        fetch("/api/admin-controls").then((res) => res.json()),
      ])
        .then(([userData, controlData]) => {
          setUser(userData);
          setIsAdmin(userData.isAdmin);
          setProfileFetched(true);
          setIsOrderFrozen(controlData.orderFreeze);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [status]);

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error saving profile",
    });
  }

  async function toggleOrderFreeze() {
    const response = await fetch("/api/admin-controls", {
      method: "POST",
    });
    const data = await response.json();
    setIsOrderFrozen(data.orderFreeze);
    const message = data.orderFreeze
      ? "Orders are now frozen"
      : "Orders are now unfrozen";
    toast.success(message);
  }

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w lg mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
      {isAdmin && (
        <div className="mt-2 text-center">
          <button
            className={`font-bold py-2 px-6 rounded-xl border border-gray-300 text-white ${
              isOrderFrozen
                ? "bg-red-700 hover:bg-red-800"
                : "bg-red-500 hover:bg-red-600"
            }`}
            onClick={toggleOrderFreeze}
          >
            {isOrderFrozen ? "Unfreeze All Orders" : "Freeze All Orders"}
          </button>
        </div>
      )}
    </section>
  );
}
