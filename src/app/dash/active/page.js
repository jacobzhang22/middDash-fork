"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import useProfile from "@/components/UseProfile";
import PastOrders from "./pastOrders";
import AvailableOrders from "./availableOrders";

export default function DasherProfile() {
  const [notify, setNotify] = useState(null);
  const { data: profileData } = useProfile();

  // useEffect(()=> {
  // 	if(notify !== null){
  // 	}
  // },[notify])

  const sendNotify = (value) => {
    fetch(`/api/users/${profileData.id}?modify=notifications`, {
      method: "PATCH",
      body: JSON.stringify({
        notifications: value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setNotify(res.dasher.dasherNotifications);
      });
  };

  useEffect(() => {
    if (profileData) {
      setNotify(profileData.dasherNotifications);
    }
  }, [profileData]);

  return (
    <div>
      <div>
        <h1 className="font-heading text-5xl text-center my-5">Dasher Page</h1>

        <div className="flex flex-col justify-center w-[300px] ml-auto mr-auto border-black border-2 py-2 rounded ">
          <div className="text-center ">
            Send Me Emails for Available Orders
          </div>
          {notify !== null && (
            <input
              id="adminCb"
              type="checkbox"
              className=""
              checked={notify}
              onChange={(ev) => sendNotify(ev.target.checked)}
            />
          )}
        </div>
      </div>
      <AvailableOrders />
    </div>
  );
}
