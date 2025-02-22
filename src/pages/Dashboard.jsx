import { Link, NavLink, Outlet } from "react-router-dom";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { GiWallet } from "react-icons/gi";
import { IoCalendar } from "react-icons/io5";
import { VscFeedback } from "react-icons/vsc";
import { FaBook, FaCalendarCheck } from "react-icons/fa";
import { MdShoppingBag, MdOutlineRestaurant } from "react-icons/md";
import { HiEnvelope, HiUserGroup } from "react-icons/hi2";
import { TfiMenuAlt } from "react-icons/tfi";
import useCart from "@/hooks/useCart";
import { Sidebar } from "react-pro-sidebar";
import useAdmin from "@/hooks/useAdmin";

const Dashboard = () => {
  const [cart] = useCart();

  const [isAdmin] = useAdmin();

  return (
    <main>
      <title>Bistro Boss | Dashboard</title>
      <section className="relative">
        <div className="flex">
          <div className="">
            <Sidebar
              width="280px"
              backgroundColor="none"
              className="bg-gold h-full py-12 px-6"
            >
              <div className="mb-14">
                <h2 className="text-4xl font-bold font-cinzel text-neutral">
                  Bistro Boss
                </h2>
                <p className="text-[18px] font-cinzel font-semibold text-neutral tracking-[0.38em]">
                  Restaurant
                </p>
              </div>
              <ul className="text-neutral text-xl font-cinzel font-medium space-y-6">
                {isAdmin ? (
                  <>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          (isActive ? "text-white" : "") +
                          " " +
                          "flex items-center gap-3"
                        }
                        to="/dashboard/admin"
                      >
                        <AiFillHome className="text-3xl" />
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          (isActive ? "text-white" : "") +
                          " " +
                          "flex items-center gap-3"
                        }
                        to="/dashboard/add-product"
                      >
                        <MdOutlineRestaurant className="text-3xl" />
                        Add Product
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          (isActive ? "text-white" : "") +
                          " " +
                          "flex items-center gap-3"
                        }
                        to="/dashboard/manage-product"
                      >
                        <TfiMenuAlt className="text-3xl" />
                        Manage Product
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          (isActive ? "text-white" : "") +
                          " " +
                          "flex items-center gap-3"
                        }
                        to="/dashboard/manage-order"
                      >
                        <FaBook className="text-3xl" />
                        Manage Orders
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          (isActive ? "text-white" : "") +
                          " " +
                          "flex items-center gap-3"
                        }
                        to="/dashboard/users"
                      >
                        <HiUserGroup className="text-3xl" />
                        Users
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          (isActive ? "text-white" : "") +
                          " " +
                          "flex items-center gap-3"
                        }
                        to="/dashboard/home"
                      >
                        <AiFillHome className="text-3xl" />
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          (isActive ? "text-white" : "") +
                          " " +
                          "flex items-center gap-3"
                        }
                        to="/dashboard/reservation"
                      >
                        <IoCalendar className="text-3xl" />
                        Reservation
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          (isActive ? "text-white" : "") +
                          " " +
                          "flex items-center gap-3"
                        }
                        to="/dashboard/payment-history"
                      >
                        <GiWallet className="text-3xl" />
                        Payment History
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          (isActive ? "text-white" : "") +
                          " " +
                          "flex items-center gap-3"
                        }
                        to="/dashboard/cart"
                      >
                        <RiShoppingCart2Fill className="text-3xl" />
                        My Cart
                        <p className="badge badge-error">{cart.length}</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          (isActive ? "text-white" : "") +
                          " " +
                          "flex items-center gap-3"
                        }
                        to="/dashboard/add-review"
                      >
                        <VscFeedback className="text-3xl" />
                        Add Review
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          (isActive ? "text-white" : "") +
                          " " +
                          "flex items-center gap-3"
                        }
                        to="/dashboard/my-orders"
                      >
                        <FaCalendarCheck className="text-3xl" />
                        My Orders
                      </NavLink>
                    </li>
                  </>
                )}

                <li>
                  <div className="h-px bg-white"></div>
                </li>
                <li>
                  <Link to="/" className="flex items-center gap-3">
                    <AiFillHome className="text-3xl" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/menu" className="flex items-center gap-3">
                    <AiOutlineMenu className="text-3xl" />
                    Menu
                  </Link>
                </li>
                <li>
                  <Link to="/shop/all" className="flex items-center gap-3">
                    <MdShoppingBag className="text-3xl" />
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="flex items-center gap-3">
                    <HiEnvelope className="text-3xl" />
                    Contact
                  </Link>
                </li>
              </ul>
            </Sidebar>
          </div>
          <div className="grow py-12 px-6 bg-[#f6f6f6]">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
