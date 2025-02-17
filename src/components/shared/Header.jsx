import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { GiShoppingCart } from "react-icons/gi";
import { RiMenu3Line } from "react-icons/ri";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [scroll, setScroll] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const handleScrollY = () => {
      setScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScrollY);

    return () => window.removeEventListener("scroll", handleScrollY);
  }, []);

  const handleLogout = () => {};

  const navItem = (
    <>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? "text-gold" : "")}
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? "text-gold" : "")}
          to="/contact"
        >
          Contact Us
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? "text-gold" : "")}
          to="/dashboard/home"
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? "text-gold" : "")}
          to="/menu"
        >
          Our Menu
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? "text-gold" : "")}
          to="/shop"
        >
          Our Shop
        </NavLink>
      </li>
      {user ? (
        <li>
          <button
            onClick={handleLogout}
            className="btn btn-secondary text-black"
          >
            Logout
          </button>
        </li>
      ) : (
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "text-gold" : "")}
            to="/signin"
          >
            Signin
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <header
      className={`fixed z-50 w-full flex items-center ${
        scroll > 124
          ? "py-4 px-7 bg-white text-black"
          : "py-8 px-14 bg-dark/50 text-white"
      } transition-all duration-200`}
    >
      <div className="navbar-start">
        <Link to="/" className="font-cinzel font-bold">
          <span className="text-3xl block">Bistro Boss</span>
          <span className="tracking-wider block">Restaurant</span>
        </Link>
      </div>
      <nav className="grow text-right">
        <ul className="px-1 font-inter hidden lg:flex items-center justify-end gap-3 menu__container">
          {navItem}

          <li className="mr-4">
            <Link
              to="/dashboard/cart"
              className="py-0 relative last:px-0 last:py-0"
            >
              <GiShoppingCart className="text-5xl" />
              <div className="h-7 w-7 flex items-center justify-center rounded-full bg-golden absolute -bottom-2 -right-2 p-0">
                <p className="text-sm">{0}</p>
              </div>
            </Link>
          </li>
        </ul>
        <div className="block lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <RiMenu3Line className="text-3xl cursor-pointer inline-block" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 block lg:hidden">
              <ul className="px-1 font-inter menu__container">
                {navItem}
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "text-gold" : "")}
                    to="/dashboard/cart"
                  >
                    Cart
                  </NavLink>
                </li>
              </ul>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default Header;
