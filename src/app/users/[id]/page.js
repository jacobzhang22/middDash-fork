"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import useProfile from "@/components/UseProfile";

export default function EditUserPage() {
  const { loading, data } = useProfile();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${id}`).then((res) => {
      res.json().then((data) => {
        setUser(data.user);
      });
    });
  }, []);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();

    const updateRaw = await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, _id: id }),
    });
    const updateParsed = await updateRaw.json();
    console.log("update", updateParsed);
    if (updateParsed.user) {
      toast.success("Updated!");
    } else {
      toast.error("Failure!");
    }
  }

  if (loading) {
    return "Loading user profile...";
  }

  if (!data.isAdmin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <UserTabs isAdmin />
      <div className="mt-8">
        {user && <UserForm user={user} onSave={handleSaveButtonClick} />}
      </div>
    </section>
  );
}
