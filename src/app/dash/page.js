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
        <div>You are already a dasher</div>
      ) : (
        <div>
          Apply to become a dasher
          {data && <ApplicationForm data={data} />}
        </div>
      )}
    </div>
  );
}
