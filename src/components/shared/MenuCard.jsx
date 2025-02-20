import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MenuCard = ({ food }) => {
  const { user } = useAuth();
  const navigage = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const { name, recipe, image, price, _id } = food;

  const queryClient = useQueryClient();

  const { mutateAsync: addToCartItem } = useMutation({
    mutationKey: ["add-to-cart"],
    mutationFn: async (cartItem) => {
      await axiosSecure.post("/carts/add-to-cart", cartItem);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Item successfully added to cart!!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const handleAddToCart = (id) => {
    if (user && user.email) {
      const cartItem = {
        menuId: id,
        email: user.email,
        name: user.displayName,
      };
      addToCartItem(cartItem);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Please sign in to add to cart!!",
        showCancelButton: true,
        confirmButtonText: "Yes, Sign In!!",
        confirmButtonColor: "#d99904",
        cancelButtonColor: "#d33",
      }).then((res) => {
        if (res.isConfirmed) {
          navigage("/signin", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="bg-[#F3F3F3] overflow-y-hidden rounded-xl">
      <div className="relative">
        <img
          src={image}
          className="w-full h-80 block object-cover object-center"
          alt=""
        />
        <p className="text-base py-3 px-6 bg-neutral font-inter text-white absolute top-5 right-5">
          ${price}
        </p>
      </div>
      <div className="py-8 px-10 font-inter text-center text-neutral h-full">
        <h2 className="text-2xl font-bold font-cinzel">{name}</h2>
        <p>{recipe}</p>
        <button
          className="golden__btn mt-6"
          onClick={() => handleAddToCart(_id)}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

MenuCard.propTypes = {
  food: PropTypes.object,
};

export default MenuCard;
