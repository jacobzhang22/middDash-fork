'use client';

import { redirect, useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import UserTabs from '@/components/layout/UserTabs';
import Left from '@/components/icons/Left';
import { useProfile } from '@/components/UseProfile';
import MenuItemForm from '@/components/layout/MenuItemForm';
import DeleteButton from '@/components/DeleteButton';

export default function EditMenuItemPage() {
  const { id } = useParams();

  const [menuItem, setMenuItem] = useState(null);
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/menu-items/" + id).then((res) => {
      res.json().then((data) => {
        setMenuItem(data.item);
      });
    });
  }, []);

  async function handleFormSubmit(ev, data) {
		console.log("submitting")
    ev.preventDefault();
    data = { ...data, id: id };
		const response = await fetch("/api/menu-items/" + id, {
			method: "PUT",
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
		});
		const parsedData = await response.json()
		setMenuItem(parsedData.item)

    // await toast.promise(savingPromise, {
    //   loading: "Saving item",
    //   success: "Saved",
    //   error: "Error",
    // });

    // setRedirectToItems(true);
  }

  async function handleDeleteClick() {

    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/menu-items/" + id, {
        method: "DELETE",
      });
      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Deleted',
      error: 'Error',
    });

    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect('/menu-items');
  }

  if (loading) {
    return 'Loading user info...';
  }

  if (!data.isAdmin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href="/menu-items" className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
			{menuItem && <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} onDelete  = {handleDeleteClick}/>}
    </section>
  );
}
