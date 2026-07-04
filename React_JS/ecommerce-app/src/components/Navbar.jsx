import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const activeStyle = ({ isActive }) => 
    isActive 
      ? 'text-blue-600 font-semibold flex items-center gap-2 py-2 md:py-0' 
      : 'text-gray-700 hover:text-black flex items-center gap-2 py-2 md:py-0';

  return (
    <nav className='relative w-full bg-gray-300 px-6 py-4 md:flex md:justify-between md:items-center'>
      
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold tracking-wide'>ShopEasy</h1>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className='block md:hidden text-gray-700 focus:outline-none'
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <ul className={`
        flex-col md:flex-row md:flex gap-4 md:gap-6 items-start md:items-center w-full md:w-auto
        ${isOpen ? 'flex mt-4' : 'hidden md:flex'}
      `}>
        <li className="w-full md:w-auto">
          <NavLink to="/" className={activeStyle} onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
        </li>
        <li className="w-full md:w-auto">
          <NavLink to="/products" className={activeStyle} onClick={() => setIsOpen(false)}>
            Products
          </NavLink>
        </li>
        <li className="w-full md:w-auto">
          <NavLink to="/cart" className={activeStyle} onClick={() => setIsOpen(false)}>
            Cart(2)
            <ShoppingCart size={18} />
          </NavLink>
        </li>
        <li className="w-full md:w-auto">
          <NavLink to="/login" className={activeStyle} onClick={() => setIsOpen(false)}>
            Login
            <User size={18} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;