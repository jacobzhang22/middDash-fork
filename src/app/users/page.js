"use client";
// import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";

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
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div key = {user.id} className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                <div className="text-gray-900">
									<div className = "space-x-2 md:space-x-10" >
                  {!!user.name && <span className= "whitespace-nowrap" >{user.name}</span>}
                  {!!user.isAdmin && <span className = "bg-[#fff71c] rounded-lg p-2">ADMIN</span>}
                  {!!user.isDasher && <span className = "bg-[#5e6df2] rounded-lg p-2">DASHER</span>}
									</div>
                  {!user.name && <span className="italic">No name</span>}
                </div>
                <span className="text-gray-500">{user.email}</span>
              </div>
              <div>
                <Link className="button" href={"/users/" + user.id}>
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
