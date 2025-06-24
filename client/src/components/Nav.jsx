import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { asyncLogoutUser } from "../store/actions/userAction"; // adjust path as needed

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.data);

  const navItems = [
    { path: "/", name: "Home" },
    { path: "/products", name: "Products" },
  ];

  // Logout handler
  const handleLogout = () => {
    dispatch(asyncLogoutUser()); // Should also clear localStorage inside this action
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur border-b border-white/50 bg-slate-900/80">
      <div className="w-full mx-auto px-14 py-3 flex justify-between items-center border-b border-white/10">
        <h1 className="text-white text-xl font-semibold tracking-tighter uppercase">
          SV.
        </h1>
        <div className="flex gap-10">
          {/* Static nav items */}
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative text-sm tracking-wider uppercase transition duration-300 
                ${isActive ? "text-white" : "text-white/60 hover:text-white"}`
              }
            >
              <span className="group relative inline-block">
                {item.name} .
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </span>
            </NavLink>
          ))}

          {/* If user is not logged in, show Login */}
          {!user && (
            <NavLink
              to="/login"
              className="text-white/60 hover:text-white text-sm uppercase tracking-wider transition duration-300"
            >
              <span className="group relative inline-block">
                Login .
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </span>
            </NavLink>
          )}

          {/* If user is logged in and admin, show Create Product */}
          {user?.isAdmin && (
            <NavLink
              to="/admin/create-product"
              className="text-white/60 hover:text-white text-sm uppercase tracking-wider transition duration-300"
            >
              <span className="group relative inline-block">
                Create Product .
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </span>
            </NavLink>
          )}

          {/* If user is logged in, show Logout */}
          {user && (
            <>
              <NavLink
                to={"/profile"}
                className="text-white/60 hover:text-white text-sm uppercase tracking-wider transition duration-300"
              >
                <span className="group relative inline-block">
                  Profile .
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </span>
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-white/60 hover:text-white text-sm uppercase tracking-wider transition duration-300"
              >
                <span className="group relative inline-block">
                  Logout .
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
