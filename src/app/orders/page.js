'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useProfile } from '@/components/UseProfile';
import Right from '@/components/icons/Right';
import UserTabs from '@/components/layout/UserTabs';
import SectionHeaders from '@/components/layout/SectionHeaders';
import MenuItem from '@/components/menu/MenuItem';

export default function MenuItemsPage() {
  const { loading, data } = useProfile();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // fetch("/api/locations?items=true").then((res) => {
    //   res.json().then((newLocations) => {
    //     setLocations(newLocations);
    //   });
    // });
  }, []);

  if (loading) {
    return 'Loading user info...';
  }

  if (!data.isAdmin) {
    return 'Not an admin.';
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin />
      <div className="mt-8">
        Orders here
      </div>
    </section>
  );
}
