"use client";

// import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserTabs from "@/components/layout/UserTabs";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  // const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((data) => {
        setUsers(data.users);
      });
    });
  }, []);

  // if (loading) {
  //   return "Loading user info...";
  // }

  // if (!data.admin) {
  //   return "Not an admin.";
  // }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin />
      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div
              key={user.id}
              className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4"
            >
              <div className=" flex flex-col md:flex-row space-y-2 space-x-0 md:space-x-2 md:space-y-0 items-center ">
                <span className="whitespace-nowrap">
                  {user.name ? user.name : "No Name"}
                </span>
                <div>
                  <span className="text-gray-500">{user.email}</span>
                </div>
                <div>
                  {!!user.isAdmin && (
                    <span className="bg-[#fff71c] rounded-lg p-2">ADMIN</span>
                  )}
                  {!!user.isDasher && (
                    <span className="bg-[#5e6df2] rounded-lg p-2">DASHER</span>
                  )}
                </div>
                <Link className="button" href={`/users/${user.id}`}>
                  Edit
                </Link>
              </div>
              <div />
            </div>
          ))}
      </div>
    </section>
  );
}
