import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Cart from './pages/Cart'
import {Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import { auth } from "./components/firebase";
import Footer from './components/Footer'
import HeroContent from './components/HeroContent'
import FilterMenu from './components/FilterMenu'
import LikedProducts from './components/LikedProducts'
import OrderSuccess from './components/OrderSuccess'


const App = () => {
  const [user, setUser] = useState();
  const [showNavbar, setShowNavbar] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <div>
      <div>
        <Navbar setShowNavbar={setShowNavbar}/>
        {
          location.pathname === '/home' && 
          <>
            <HeroContent/>
            <FilterMenu showNavbar={showNavbar} setShowNavbar={setShowNavbar}/>
          </>
        }
      </div>

      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/profile" /> : <Login />}
        />
        <Route path='/home' element={<Home showNavbar={showNavbar}/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/likedproducts" element={<LikedProducts />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>

      <div>
        <Footer/>
      </div>
      
    </div>
  )
}

export default App

