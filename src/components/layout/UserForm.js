"use client";

import { useState } from "react";
import AddressInputs from "@/components/layout/AddressInputs";
import useProfile from "../UseProfile";

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [roomNumber, setRoomNumber] = useState(user?.roomNumber || "");
  const [dorm, setDorm] = useState(user?.dorm || "");
  const [admin, setAdmin] = useState(user?.isAdmin || false);
  const [dasher, setDasher] = useState(user?.isDasher || false);
  const [venmo, setVenmo] = useState(user?.venmo || "");
  const { data: loggedInUserData } = useProfile();

  console.log("users", user);
  function handleAddressChange(propName, value) {
    if (propName === "dorm") setDorm(value);
    if (propName === "roomNumber") setRoomNumber(value);
    if (propName === "phone") setPhone(value);
    if (propName === "venmo") setVenmo(value);
  }

  return (
    <div className="flex gap-4">
      {/* <div> */}
      {/*   <div className="p-2 rounded-2xl relative max-w-[120px] "> */}
      {/*     <EditableImage link={image} setLink={setImage} /> */}
      {/*   </div> */}
      {/* </div> */}
      <form
        className="grow"
        onSubmit={(ev) => {
          onSave(ev, {
            name: userName,
            image,
            phone,
            admin,
            roomNumber,
            dorm,
            dasher,
            venmo,
          });
        }}
      >
        <label>First and last name</label>
        <input
          type="text"
          placeholder="First and last name"
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
        />
        <label>Email</label>
        <input type="email" disabled value={user.email} placeholder="Email" />
        <AddressInputs
          addressProps={{
            phone,
            roomNumber,
            dorm,
            venmo,
          }}
          // eslint-disable-next-line react/jsx-no-bind
          setAddressProp={handleAddressChange}
        />
        {loggedInUserData.isAdmin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-2 mb-2"
              htmlFor="adminCb"
            >
              <input
                id="adminCb"
                type="checkbox"
                className=""
                value="1"
                checked={admin}
                onClick={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
            <div>
              <label
                className="p-2 inline-flex items-center gap-2 mb-2"
                htmlFor="dasherCb"
              >
                <input
                  id="dasherCb"
                  type="checkbox"
                  className=""
                  value="1"
                  checked={dasher}
                  onClick={(ev) => setDasher(ev.target.checked)}
                />
                <span>Dasher</span>
              </label>
            </div>
          </div>
        )}
        <button type="submit" className="my-2">
          Save
        </button>
      </form>
    </div>
  );
}
