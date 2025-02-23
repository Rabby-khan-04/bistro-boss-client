import SectionTitle from "@/components/shared/SectionTitle";
import Spinner from "@/components/shared/Spinner";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: orders, isLoading: orderIsLoading } = useQuery({
    queryKey: ["order-history", { email: user?.email }],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/order/${user?.email}`);

      return res.data.data;
    },
  });

  if (orderIsLoading) return <Spinner />;

  const totalPrice = orders.reduce(
    (prevVal, currVal) => prevVal + currVal.price,
    0
  );

  return (
    <>
      <title>Bistro Boss | Orders</title>
      <div className="db__container">
        <SectionTitle
          subHeading={"My Orders"}
          heading={"ALL PAYMENT HISTORY"}
        />
        <div className="bg-white p-12">
          <div className="font-cinzel font-semibold text-neutral flex justify-between items-center mb-12">
            <p className="text-3xl">Total orders: {orders.length}</p>
            <p className="text-3xl">total price: {totalPrice}</p>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="table w-full font-inter border-separate border-spacing-y-4">
              {/* head */}
              <thead>
                <tr className="uppercase">
                  <th className="bg-gold text-white">#</th>
                  <th className="bg-gold text-white">Total Item</th>
                  <th className="bg-gold text-white">Date</th>
                  <th className="bg-gold text-white">Transaction Id</th>
                  <th className="bg-gold text-white">Price</th>
                  <th className="bg-gold text-white">status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`text-center ${
                      item.status === "pending"
                        ? "bg-gray-200"
                        : item.status === "success"
                        ? "bg-green-200"
                        : "bg-red-200"
                    }`}
                  >
                    <td>{index + 1}</td>
                    <td>
                      <p>{item.cartId.length}</p>
                    </td>
                    <td>
                      <p>{new Date(item.date).toLocaleDateString("en")}</p>
                    </td>
                    <td>
                      <p>{item.transitionId}</p>
                    </td>
                    <td>
                      <p>${item.price}</p>
                    </td>
                    <td className="">{item.status}</td>
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

export default MyOrders;
