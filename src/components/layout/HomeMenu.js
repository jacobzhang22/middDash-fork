"use client";
import { useEffect, useState } from "react";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

export default function HomeMenu() {
  const [featuredItems, setFeaturedItems] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setFeaturedItems(menuItems.slice(-3));
      });
    });
  }, []);

  return (
    <section className="">
      <div className="text-center mb-4">
        <SectionHeaders mainHeader={"Featured Items"} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {featuredItems?.length > 0 &&
          featuredItems.map((item) => <MenuItem {...item} />)}
      </div>
    </section>
  );
}
