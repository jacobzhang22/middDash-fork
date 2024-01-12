"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";

export default function MenuPage() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("/api/locations?items=true").then((res) => {
      res.json().then((locationItems) => setLocations(locationItems));
    });
  }, []);
  return (
    <section className="mt-8">
      {locations.length > 0 &&
        locations.map((location) => (
          <div key = {location.id}>
            <div className="text-center">
              <SectionHeaders mainHeader={location.name} />
            </div>
            <div className="flex flex-row justify-center gap-4 mt-6 mb-12">
              { location.items
                .map((item) => (
									<div key = {item.key} >
										<MenuItem {...item} />
									</div>
                ))}
            </div>
          </div>
        ))}
    </section>
  );
}
