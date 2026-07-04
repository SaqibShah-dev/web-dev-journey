import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react"; 
import Logo from "../components/Logo"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const activeStyle = ({ isActive }) => 
    isActive 
      ? 'text-blue-600 font-semibold flex items-center gap-1.5 py-2 md:py-0 transition-colors' 
      : 'text-gray-600 hover:text-blue-600 flex items-center gap-1.5 py-2 md:py-0 transition-colors';

  return (
    <nav className='relative w-full bg-white border-b border-gray-100 shadow-sm z-50 px-6 py-4 md:flex md:justify-between md:items-center'>
      <div className='flex items-center justify-between'>
        <NavLink to="/" onClick={() => setIsOpen(false)}>
          <Logo className="scale-90 origin-left" />
        </NavLink>

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className='block md:hidden text-gray-600 hover:text-gray-900 focus:outline-none transition-colors'
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <ul className={`
        flex-col md:flex-row md:flex gap-4 md:gap-8 items-start md:items-center w-full md:w-auto
        ${isOpen ? 'flex mt-5 border-t border-gray-100 pt-4 md:mt-0 md:border-t-0 md:pt-0' : 'hidden md:flex'}
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
            <span>Cart(2)</span>
            <ShoppingCart size={18} />
          </NavLink>
        </li>
        <li className="w-full md:w-auto">
          <NavLink to="/login" className={activeStyle} onClick={() => setIsOpen(false)}>
            <span>Login</span>
            <User size={18} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;