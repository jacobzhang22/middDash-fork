import EditableImage from "@/components/layout/EditableImage";
import { useEffect, useState } from "react";
import DeleteButton from "@/components/DeleteButton";

export default function MenuItemForm({ onSubmit, menuItem, onDelete  }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [price, setPrice] = useState(menuItem?.price || "");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(menuItem?.category || "");

  useEffect(() => {
		console.log("menuItem", menuItem)
    // fetch("/api/categories").then((res) => {
    //   res.json().then((categories) => {
    //     setCategories(categories);
    //   });
    // });
  }, [menuItem]);

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, { image, name, description, price, category })
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
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label>Category</label>
          <select
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            {/* {categories?.length > 0 && */}
            {/*   categories.map((c) => <option value={c._id}>{c.name}</option>)} */}
          </select>
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
