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
    <section className=" max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin />
      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div
              key={user.id}
              className="bg-gray-100 rounded-lg mb-2 p-1 pl-4 md:inline-grid md:grid-cols-8 items-center w-full flex flex-col justify-center gap-2 md:gap-0  "
            >
              <span className="whitespace-nowrap col-span-2 w-[200px] md:text-left text-center ">
                {user.name ? user.name : "No Name"}
              </span>

              <span className=" text-gray-500 col-span-3 ">{user.email}</span>

              <span className=" px-1 col-span-1 ">
                {!!user.isAdmin && (
                  <span className="bg-[#fff71c] rounded-lg p-2  ">ADMIN</span>
                )}
              </span>

              <span className=" px-1 col-span-1 ">
                {!!user.isDasher && (
                  <span className="bg-[#5e6df2] rounded-lg p-2 ">DASHER</span>
                )}
              </span>

              <span className=" pl-1 col-span-1 ">
                <Link className="button  " href={`/users/${user.id}`}>
                  Edit
                </Link>
              </span>
            </div>
          ))}
      </div>
    </section>
  );
}
