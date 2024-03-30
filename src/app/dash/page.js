"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useProfile from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import ApplicationForm from "./ApplicationForm";

export default function DasherPage() {
  const { loading, data } = useProfile();
  const [orders, setOrders] = useState([]);

  return (
    <div>
      {data && data.isDasher ? (
        <div className="text-center pt-10">
          You are an approved dasher.
          <br />
          To view available orders, please click
          <Link href="/dash/active" className="text-blue-500">
            {" "}
            here{" "}
          </Link>
        </div>
      ) : (
        <div>
          <div className="text-4xl text-gray-700 font-bold my-8 text-center">
            Apply to become a dasher
          </div>
          <div className="max-w-[500px] mx-auto  ">
            {data && <ApplicationForm data={data} />}
          </div>
        </div>
      )}
    </div>
  );
}
