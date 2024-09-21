import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unlike } from "../redux/Slices/LikedItemsSlice";
import Product from './Product'; 

const LikedProducts = () => {
  const { likedItems } = useSelector((state) => state);
  const dispatch = useDispatch();

  if (likedItems.length === 0) {
    return (
        <div className='d-flex justify-content-center w-100'>
            <div className='text-center'>
                <img src='noItemFound.png' className='h-40'/>
                <p>No liked products</p>
            </div>
        </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {likedItems.map((product) => (
        <div key={product.id} className='p-4'>
          <Product post={product} />
        </div>
      ))}
    </div>
  );
};

export default LikedProducts;
