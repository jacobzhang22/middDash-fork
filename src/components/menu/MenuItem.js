import { CartContext } from "@/components/AppContext";
import { useContext } from "react";
// import FlyingButton from "react-flying-item";

export default function MenuItem(menuItem) {
  const { image, name, description, basePrice } = menuItem;
  const { addToCart } = useContext(CartContext);

  function handleAddToCartButtonClick() {
    addToCart(menuItem);
  }

  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="text-center">
        {/* <img */}
        {/*   src={image} */}
        {/*   className="max-h-auto max-h-24 block mx-auto" */}
        {/*   alt="pizza" */}
        {/* ></img> */}
      </div>
      <h4 className="font-semibold text-xl my-3">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      <div className="flying-button-parent mt-4">
        {/* <FlyingButton targetTop={"5%"} targetLeft={"95%"} src={image}> */}
        {/*   <div */}
        {/*     className="primary sticky bottom-2" */}
        {/*     onClick={handleAddToCartButtonClick} */}
        {/*   > */}
        {/*     Add to cart ${basePrice} */}
        {/*   </div> */}
        {/* </FlyingButton> */}
      </div>
    </div>
  );
}
