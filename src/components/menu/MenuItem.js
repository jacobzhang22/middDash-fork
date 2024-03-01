import { useContext } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { CartContext } from "@/components/AppContext";

export default function MenuItem(menuItem) {
  const { image, name, description, price } = menuItem;
  const { addToCart } = useContext(CartContext);
  const { isValidCartProduct } = useContext(CartContext);

  function handleAddToCartButtonClick() {
    if (isValidCartProduct(menuItem)) {
      addToCart(menuItem);
      toast.success(`${name} added to cart!`);
    } else {
      toast.error(`Cannot add ${name}!\nPlease select from the same location.`);
    }
  }

  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all w-[150px] md:w-[250px] h-full flex flex-col justify-between ">
      <h4 className="font-semibold text-xl mb-1 ">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      <Image
        src={image || "/midd_panther1.png"}
        width={40}
        height={200}
        className=" hidden md:block max-h-auto max-h-24 mx-auto"
        alt={name}
      />
      <div className="flying-button-parent ">
        <div targetTop="5%" targetLeft="95%" src={image}>
          <div
            className="primary sticky bottom-2 cursor-pointer border-black border-2 rounded-[10px] px-2 text-sm md:text-lg"
            onClick={handleAddToCartButtonClick}
          >
            Add to cart ${price}
          </div>
        </div>
      </div>
    </div>
  );
}
