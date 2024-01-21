import { useContext } from 'react';
import Image from 'next/image';
import { CartContext } from '@/components/AppContext';

export default function MenuItem(menuItem) {
  const {
    image, name, description, price,
  } = menuItem;
  const { addToCart } = useContext(CartContext);

  function handleAddToCartButtonClick() {
    console.log('adding to car');
    addToCart(menuItem);
  }

  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all w-[250px]">
      <div className="text-center" />
      <h4 className="font-semibold text-xl my-3">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      <Image
        src={image || '/midd_panther1.png'}
        width={40}
        height={200}
        className="max-h-auto max-h-24 block mx-auto"
        alt="pizza"
      />
      <div className="flying-button-parent mt-4">
        <div targetTop="5%" targetLeft="95%" src={image}>
          <div
            className="primary sticky bottom-2 cursor-pointer border-black border-2 rounded-[10px] "
            onClick={handleAddToCartButtonClick}
          >
            Add to cart $
            {price}
          </div>
        </div>
      </div>
    </div>
  );
}
