import EditableImage from "@/components/layout/EditableImage";
import { useEffect, useState } from "react";
import DeleteButton from "@/components/DeleteButton";
import { useSearchParams } from 'next/navigation'


export default function MenuItemForm({ onSubmit, menuItem, onDelete  }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [price, setPrice] = useState(menuItem?.price || "");
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState(menuItem?.locationId || "");
  const [category, setCategory] = useState(menuItem?.category || "");

  useEffect(() => {
		console.log("menuItem", menuItem)
    fetch("/api/locations").then((res) => {
      res.json().then((newLocations) => {
        setLocations(newLocations);
				if(location == ""){
					setLocation(newLocations[0].id)
				}
				console.log("new locations", newLocations)
      });
    });
  }, [menuItem]);

	const searchParams = useSearchParams()
 
  const paramLoc = searchParams.get('location')
  useEffect(() => {
		setLocation(paramLoc)
  }, [paramLoc]);
 


  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, { image, name, description, price, location })
      }
      className="mt-8 max-w-2xl mx-auto"
    >
      <div
        className="grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />

          <label>Location</label>
          <select
            value={location}
            onChange={(ev) => setLocation(ev.target.value)}
          >
            {locations?.length > 0 && 
               locations.map((l) => <option  key = {l.id} value={l.id}>{l.name}</option>)}
          </select>

          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label>Price ($) </label>
          <input
            type="text"
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
          />
          <button type="submit">Save</button>
					<div className = "mt-2" >
					<DeleteButton
            label="Delete this menu item"
            onDelete={onDelete}
          />
					</div>
        </div>
      </div>
    </form>
  );
}
