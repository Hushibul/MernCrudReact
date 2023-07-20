import { StarFill } from "react-bootstrap-icons";
import useCart from "../../hooks/useCart";

const ProductCard = (props) => {
  const { image, name, rating, price } = props;
  console.log(props);
  const { cartProducts, setCartProducts } = useCart();
  console.log(cartProducts);
  return (
    <div className=" bg-megent shadow p-4 shadow-shadowSlate h-fit flex flex-col items-center hover:bg-teal transition-all duration-300 rounded">
      <img src={image} alt={name} />
      <h4 className="font-bold mt-3">{name}</h4>
      <p className="">{price}</p>

      <div className="flex gap-x-1 my-3">
        {Array.from(Array(rating), (_, i) => (
          <StarFill color="yellow" key={i} />
        ))}
      </div>
      <button
        onClick={setCartProducts(props)}
        className="bg-gray text-white px-4 py-2 font-bold rounded hover:-translate-y-1 transition-all duration-200 focus:translate-y-1"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
