import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from "../redux/Slices/CartSlice";
import { like, unlike } from "../redux/Slices/LikedItemsSlice";  // Import actions for liking
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import heart icons for like/unlike

const Product = ({ post }) => {
  const { cart } = useSelector((state) => state);
  const { likedItems } = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(add(post));
    toast.success("Item added to Cart");
  };

  const removeFromCart = () => {
    dispatch(remove(post.id));
    toast.error("Item removed from Cart");
  };

  const toggleLike = () => {
    if (likedItems.some((p) => p.id === post.id)) {
      dispatch(unlike(post.id));
      toast.error("Item unliked");
    } else {
      dispatch(like(post));
      toast.success("Item liked");
    }
  };

  // Limit the title and description lengths
  const truncatedTitle = post.title.length > 20 ? post.title.substring(0, 20) + "..." : post.title;
  const truncatedDescription = post.description.length > 50 ? post.description.substring(0, 30) + "..." : post.description;

  return (
    <div className="flex flex-col items-center justify-between p-2 rounded-lg bg-white border border-gray-200 transition-transform transform hover:scale-105 w-72 h-72">
      {/* Product Image */}
      <div className="w-full h-40 relative overflow-hidden rounded-t-lg">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col items-center mt-2 overflow-hidden text-center">
        <span className='align-items-baseline d-flex'>
          <p className="text-gray-700 font-semibold text-lg">{truncatedTitle}</p>
          {/* Like Button */}
          <div className="cursor-pointer ml-2" onClick={toggleLike}>
            {likedItems.some((p) => p.id === post.id) ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-500" />
            )}
          </div>

        </span>
        
        <p className="text-gray-500 text-sm mt-1">{truncatedDescription}</p>
      </div>


      {/* Price and Cart Button */}
      <div className="flex justify-between items-center w-full mt-4 align-items-baseline">
        <p className="text-green-600 font-semibold text-lg">${post.price.toFixed(2)}</p>
        {cart.some((p) => p.id === post.id) ? (
          <button
            className="bg-red-500 text-white border-2 border-red-500 rounded-full font-semibold text-sm py-1 px-3 hover:bg-red-600 transition duration-200"
            onClick={removeFromCart}
          >
            Remove
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white border-2 border-blue-500 rounded-full font-semibold text-sm py-1 px-3 hover:bg-blue-600 transition duration-200"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
