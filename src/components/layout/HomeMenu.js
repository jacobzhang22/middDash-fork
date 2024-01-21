'use client';

import { useEffect, useState } from 'react';
import MenuItem from '../menu/MenuItem';
import SectionHeaders from './SectionHeaders';

export default function HomeMenu() {
  const [featuredItems, setFeaturedItems] = useState([]);
  useEffect(() => {
    fetch('/api/menu-items/featured').then((res) => {
      res.json().then((menuItems) => {
        setFeaturedItems(menuItems.slice(-3));
      });
    });
  }, []);

  return (
    <section className="">
      <div className="text-center mb-4">
        <SectionHeaders mainHeader="Featured Items" />
      </div>
      <div className=" flex flex-row justify-center gap-4">
        {featuredItems?.length > 0
          && featuredItems.map((item) => (
            <div key={item.id}>
              <MenuItem {...item} />
            </div>
          ))}
      </div>
    </section>
  );
}
