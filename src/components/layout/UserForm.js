"use client";
import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";
import { useProfile } from "../UseProfile";
import AddressInputs from "@/components/layout/AddressInputs";

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [roomNumber, setRoomNumber] = useState(user?.roomNumber || "");
  const [dorm, setDorm] = useState(user?.dorm || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === "dorm") setDorm(value);
    if (propName === "roomNumber") setRoomNumber(value);
    if (propName === "phone") setPhone(value);
  }

  return (
    <div className="flex gap-4">
      <div>
        <div className="p-2 rounded-2xl relative max-w-[120px] ">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, { name: userName, image, phone, admin, roomNumber, dorm })
        }
      >
        <label>First and last name</label>
        <input
          type="text"
          placeholder="First and last name"
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          disabled={true}
          value={user.email}
          placeholder={"email"}
        />
        <AddressInputs
          addressProps={{
            phone,
            roomNumber,
            dorm,
          }}
          setAddressProp={handleAddressChange}
        />
        {loggedInUserData.admin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-2 mb-2"
              htmlFor="adminCb"
            >
              <input
                id="adminCb"
                type="checkbox"
                className=""
                value={"1"}
                checked={admin}
                onClick={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}
        <button type="submit" className="my-2">
          Save
        </button>
      </form>
    </div>
  );
}
