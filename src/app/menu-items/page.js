"use client";
import { useProfile } from "@/components/UseProfile";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import NewMenuItem from "@/components/menu/NewMenuItem";

export default function MenuItemsPage() {
  const { loading, data } = useProfile();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("/api/locations?items=true").then((res) => {
      res.json().then((newLocations) => {
        setLocations(newLocations);
      });
    });
  }, []);

  if (loading) {
    return "Loading user info...";
  }

  if (!data.isAdmin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link className="button flex" href={"/menu-items/new"}>
          <span>Create new menu item</span>
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu items:</h2>
      {locations.length > 0 &&
        locations.map((location) => (
          <div key = {location.id}>
            <div className="text-center">
              <SectionHeaders mainHeader={location.name} />
            </div>
            <div className="flex flex-row justify-center items-stretch gap-4 mt-6 mb-12">
              { location.items
                .map((item) => (
									<div key = {item.key} >
										<Link href = {"/menu-items/edit/" + item.id}>
											<MenuItem {...item} />
										</Link>
									</div>
                ))}
							<div className = "" >
								<Link href = {`/menu-items/new?location=${location.id}`} className = " h-full " >
									<NewMenuItem />
								</Link>

							</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
