import React, { useState, useRef, useEffect } from 'react';
import { FaShoppingCart, FaBars, FaHome, FaHeart } from 'react-icons/fa';
import { IoHomeSharp } from "react-icons/io5";
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const Navbar = (props) => {
  const { cart } = useSelector((state) => state);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Check if user is logged in
  const dropdownRef = useRef(null);
  const location = useLocation();

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const fetchUserProfilePic = async () => {
      const user = auth.currentUser;
      if (user) {
        setIsLoggedIn(true); // User is logged in
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setProfilePic('https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg');
        }
      } else {
        setIsLoggedIn(false); // User is not logged in
      }
    };

    fetchUserProfilePic();
  }, [location, auth.currentUser]);

  const isLoginPage = location.pathname === '/login';
  const isSignUpPage = location.pathname === '/register';

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Top Section */}
      <div className="bg-black text-red-500 text-center py-2">
        Welcome Ladies & Gentlemen to our store
      </div>

      {/* Middle Section */}
      <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto px-5">
        {/* Logo Section */}
        <NavLink to={isLoggedIn ? "/home" : '/login'}>
          <div className="flex items-center">
            <img src="../logoo.png" className="h-14" alt="Logo" />
          </div>
        </NavLink>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8 font-medium text-gray-800">

          {isLoggedIn && (!isSignUpPage && !isLoginPage) ? (
            <>
              <NavLink
                to="/home"
                className="hover:text-green-500 transition duration-200"
              >
                <FaHome className="text-2xl text-black" />
              </NavLink>
              <NavLink
                to="/likedproducts"
                className="hover:text-green-500 transition duration-200"
              >
                <FaHeart className="text-2xl text-black" />
              </NavLink>
              {/* Cart Section */}
              <NavLink to="/cart" className="relative">
                <FaShoppingCart className="text-2xl text-black hover:text-green-500 transition duration-200" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white">
                    {cart.length}
                  </span>
                )}
              </NavLink>

              {/* Profile Dropdown */}
              {profilePic || isLoggedIn ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={handleDropdownToggle}
                    className="flex items-center focus:outline-none"
                  >
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-green-400"
                    />
                    <span className="ml-2 text-sm hidden md:block">Profile</span>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl text-gray-800">
                      <NavLink
                        to="/profile"
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 text-decoration-none"
                      >
                        My Account
                      </NavLink>
                      {/* <NavLink
                        to="/orders"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                      >
                        My Orders
                      </NavLink> */}
                      <button
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : null}
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <NavLink
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition no-underline"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition no-underline"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
