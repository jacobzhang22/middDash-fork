import FlyingButton from "react-flying-item";

export default function AddToCartButton({ onClick, basePrice, image }) {
  return (
    <FlyingButton targetTop={"5%"} targetLeft={"95%"} src={image}>
      <div onClick={onClick}>Add to cart ${basePrice}</div>
    </FlyingButton>
  );
}
