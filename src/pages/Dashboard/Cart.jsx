import SectionTitle from "@/components/shared/SectionTitle";
import Spinner from "@/components/shared/Spinner";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useCart from "@/hooks/useCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Cart = () => {
  const [cart, cartIsLoading] = useCart();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const { mutateAsync: deleteCartItem } = useMutation({
    mutationKey: ["delet-cart"],
    mutationFn: async (id) => {
      await axiosSecure.delete(`/carts/cart/${id}`);
    },
    onSuccess: () => {
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Item Deleted Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      queryClient.invalidateQueries(["cart"]);
    },
  });

  if (cartIsLoading) return <Spinner />;

  const goToPayment = () => {
    navigate("/dashboard/checkout");
  };

  const totalPrice = cart.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.product.price;
  }, 0);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCartItem(id);
      }
    });
  };

  return (
    <>
      <title>Bistro Boss | Cart</title>
      <div className="db__container">
        <SectionTitle subHeading={"My Cart"} heading={"Wanna Add More"} />
        <div className="bg-white p-12">
          <div className="font-cinzel font-semibold text-neutral flex justify-between items-center mb-12">
            <p className="text-3xl">Total orders: {cart.length}</p>
            <p className="text-3xl">total price: {totalPrice}</p>
            <button
              className="p-4 rounded-xl bg-gold border-gold text-white text-xl"
              onClick={goToPayment}
            >
              Pay
            </button>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="table w-full font-inter border-separate border-spacing-y-4">
              {/* head */}
              <thead>
                <tr className="uppercase">
                  <th className="bg-gold text-white"></th>
                  <th className="bg-gold text-white">Item Image</th>
                  <th className="bg-gold text-white">Item Name</th>
                  <th className="bg-gold text-white">Price</th>
                  <th className="bg-gold text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={item._id} className="">
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={item.product.image}
                        className="h-20 w-20 object-cover"
                        alt=""
                      />
                    </td>
                    <td>
                      <h2>{item.product.name}</h2>
                    </td>
                    <td>
                      <p>${item.product.price}</p>
                    </td>
                    <td className="text-center">
                      <button
                        className="p-4 rounded-xl bg-error border-error cursor-pointer"
                        onClick={() => handleDelete(item._id)}
                      >
                        <RiDeleteBin5Line className="text-2xl text-white" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
