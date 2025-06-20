import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  const navItems = [
    { path: '/', name: 'Home' },
    { path: '/products', name: 'Products' },
    { path: '/login', name: 'Login' },
    { path: '/contact', name: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur border-b border-white/50">
      <div className="w-full mx-auto px-14 py-3 flex justify-between items-center border-b border-white/10">
        {/* Logo */}
        <h1 className="text-white text-xl font-semibold tracking-tighter uppercase">
          SV.
        </h1>

        {/* Navigation Links */}
        <div className="flex gap-10">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative text-sm tracking-wider uppercase transition duration-300 
                ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`
              }
            >
              <span className="group relative inline-block">
                {item.name} .
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
