
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { clearCart } from '../redux/Slices/CartSlice';  
import CartItem from '../components/CartItem';
import Modal from './Modal'; 
import { toast } from 'react-hot-toast';

const OrderSuccess = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const confirmOrder = () => {
    setIsModalOpen(true);  
  };

  const handleFormSubmit = (formData) => {
    dispatch(clearCart());
    toast.success('Order placed successfully!');
    setIsModalOpen(false);  // Close modal
    navigate('/home');  
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Order Summary</h1>

      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        {cart.length > 0 ? (
          <div>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            <button
              onClick={confirmOrder}
              className="mt-6 bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600 transition"
            >
              Confirm Order
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl font-semibold">No items in the cart!</p>
            <NavLink to="/home">
              <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition">
                Shop Now
              </button>
            </NavLink>
          </div>
        )}
      </div>

      {/* Modal component */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} onSubmit={handleFormSubmit} />
      )}
    </div>
  );
};

export default OrderSuccess;

