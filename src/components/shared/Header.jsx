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
import Swal from "sweetalert2";
import useCart from "@/hooks/useCart";
import useAdmin from "@/hooks/useAdmin";

const Header = () => {
  const [scroll, setScroll] = useState(0);
  const { user, logOut } = useAuth();
  const [cart] = useCart();
  const [isAdmin] = useAdmin();

  useEffect(() => {
    const handleScrollY = () => {
      setScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScrollY);

    return () => window.removeEventListener("scroll", handleScrollY);
  }, []);

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({ icon: "success", title: "User sign out successfully!!" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          to={`/dashboard/${isAdmin ? "admin" : "home"}`}
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
          to="/shop/all"
        >
          Our Shop
        </NavLink>
      </li>
      {user ? (
        <li>
          <button onClick={handleLogout} className="cursor-pointer">
            Sign Out
          </button>
        </li>
      ) : (
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "text-gold" : "")}
            to="/signin"
          >
            Sign in
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <header
      className={`fixed z-50 w-full flex items-center ${
        scroll > 70
          ? "py-4 px-7 bg-white text-black shadow"
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
              <div className="h-7 w-7 flex items-center justify-center rounded-full bg-gold absolute -bottom-2 -right-2 p-0">
                <p className="text-sm">
                  {cart.length > 9 ? "9+" : cart.length}
                </p>
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
