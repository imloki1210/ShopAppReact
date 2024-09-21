import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import CartItem from '../components/CartItem'
import { toast } from 'react-hot-toast';


const Cart = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const { cart } = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate('/order-success');  // Redirect to the order success page
    } else {
      toast.error("Your cart is empty");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto max-h-screen p-4 border-gray-300 bg-white rounded-lg">
        {cart.length > 0 ? (
          <>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </>
        ) : (
          <div className="flex items-center justify-center flex-col min-h-screen">
            <div className="text-center p-8">
              <img src='noItemFound.png' className='h-72' alt="No items found" />
              <NavLink to={"/home"}>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition">
                  Shop Now
                </button>
              </NavLink>
            </div>
          </div>
        )}
      </div>

      {/* Billing Information */}
      <div className="w-80 p-6 bg-gray-100 rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">Order Summary</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Summary</h3>
          <p className="text-gray-700 mt-2">Total Items: {cart.length}</p>
        </div>
        <div className="border-t pt-4 mt-4">
          <p className="text-xl font-bold">Total Amount: ${totalAmount.toFixed(2)}</p>
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white px-5 py-2 rounded-md shadow-md hover:bg-green-600 transition mt-4"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart
