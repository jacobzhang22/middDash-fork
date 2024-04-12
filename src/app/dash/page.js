"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useProfile from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { useRouter } from "next/navigation";
import ApplicationForm from "./ApplicationForm";

export default function DasherPage() {
  const { loading, data } = useProfile();
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (data && data.isDasher) {
      router.push("/dash/active");
    }
  }, [data]);
  return (
    <div>
      {data && data.isDasher ? (
        <div className="text-center pt-10" />
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
