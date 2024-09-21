import React, { useState } from 'react';

const FilterMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = () => {
    props.setShowNavbar(!props.showNavbar);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-between items-center my-4 mx-16 border-t-2 border-b-2 border-gray-300">
      {/* Uncomment if needed */}
      {/* <h4 className="font-raleway text-sm">20 ITEMS</h4> */}
      <button 
        onClick={toggleFilter} 
        className="text-gray-700 font-raleway text-sm"  // Changed text color to gray
      >
        {props.showNavbar ? "HIDE FILTER" : "SHOW FILTER"}
      </button>
      <div className="relative inline-block">
        <button 
          onClick={toggleDropdown} 
          className="font-raleway text-black bg-white py-2 px-4 text-sm rounded"  // Removed border and shadow
        >
          RECOMMEND
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
            <a href="#" className="block px-4 py-2 text-black hover:bg-gray-100">
              NEWEST
            </a>
            <a href="#" className="block px-4 py-2 text-black hover:bg-gray-100">
              POPULAR
            </a>
            <a href="#" className="block px-4 py-2 text-black hover:bg-gray-100">
              PRICE
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterMenu;
