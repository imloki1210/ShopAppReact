import React from 'react'
import { FcDeleteDatabase } from "react-icons/fc"
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import { remove } from "../redux/Slices/CartSlice"

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.error("Item removed from Cart");
  }

  // Limit description length
  const maxDescriptionLength = 100; // Adjust this value as needed
  const shortDescription = item.description.length > maxDescriptionLength
    ? `${item.description.substring(0, maxDescriptionLength)}...`
    : item.description;

  return (
    <div className="flex items-start p-4 border-b border-gray-200">
      <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-lg mr-4" />
      <div className="flex-1">
        <h2 className="text-lg font-semibold truncate">{item.title}</h2>
        <p className="text-gray-600 text-sm mt-1 truncate">{shortDescription}</p>
        <p className="text-green-600 font-semibold mt-2">${item.price.toFixed(2)}</p>
      </div>
      <button
        onClick={removeFromCart}
        className="ml-4 text-red-500 hover:text-red-700 transition"
      >
        <FcDeleteDatabase className="text-2xl" />
      </button>
    </div>
  )
}

export default CartItem
