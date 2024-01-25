import { useContext } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { CartContext } from "@/components/AppContext";

export default function MenuItem(menuItem) {
  const { image, name, description, price } = menuItem;
  const { addToCart } = useContext(CartContext);

  function handleAddToCartButtonClick() {
    addToCart(menuItem);
    toast.success(`${name} added to cart!`);
  }

  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all w-[250px]">
      <h4 className="font-semibold text-xl my-3">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      <Image
        src={image || "/midd_panther1.png"}
        width={40}
        height={200}
        className="max-h-auto max-h-24 block mx-auto"
        alt={name}
      />
      <div className="mt-4">
        <div
          className="primary sticky bottom-2 cursor-pointer border-black border-2 rounded-[10px]"
          onClick={handleAddToCartButtonClick}
        >
          Add to cart ${price}
        </div>
      </div>
    </div>
  );
}
