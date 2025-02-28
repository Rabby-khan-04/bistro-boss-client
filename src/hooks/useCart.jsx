import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: cart = [], isLoading: cartIsLoading } = useQuery({
    queryKey: ["cart", { email: user?.email }],
    queryFn: async () => {
      const res = await axiosSecure.get("/carts/cart", {
        params: { email: user?.email },
      });

      return res.data.data;
    },
  });

  return [cart, cartIsLoading];
};

export default useCart;
