"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import useProfile from "@/components/UseProfile";

export default function ProfilePage() {
  const { loading, data } = useProfile();
  const [applications, setApplications] = useState();

  const fetchApplications = () => {
    fetch("/api/applications")
      .then((res) => res.json())
      .then((dat) => {
        setApplications(dat.applications);
      });
  };
  useEffect(() => {
    fetchApplications();
  }, []);

  const respond = (id, action) => {
    fetch(`/api/applications/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ action }),
    })
      .then((res) => res.json())
      .then((dat) => {
        if (dat.status === "success") {
          toast.success("The application has been updated");
          fetchApplications();
        } else {
          toast.error(`Error: ${dat.data}`);
        }
      });
  };

  // if (loading) {
  //   return "Loading user info...";
  // }

  // if (!data.isAdmin) {
  //   return "Not an admin.";
  // }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin />
      <div className=" mt-8">
        {applications?.length > 0 &&
          applications.map((application) => (
            <div
              key={application.id}
              className="bg-gray-100 rounded-lg mb-2 p-1 pl-4 md:inline-grid md:grid-cols-3 items-center w-full flex flex-col justify-center gap-2 md:gap-0 hover:py-4 "
            >
              <div className="">
                <span className="text-gray-500">{application.user.name}</span>
              </div>
              <div className="">
                <span className="text-gray-500">{application.user.email}</span>
              </div>
              <div className="flex flew-row space-x-3 ">
                <div
                  className="bg-green-200 px-3 py-1 rounded cursor-pointer "
                  onClick={() => respond(application.id, "approve")}
                >
                  APPROVE
                </div>
                <div
                  className="bg-red-200 px-3 py-1 rounded cursor-pointer "
                  onClick={() => respond(application.id, "deny")}
                >
                  DENY
                </div>
              </div>
              <div />
            </div>
          ))}
      </div>
    </section>
  );
}
