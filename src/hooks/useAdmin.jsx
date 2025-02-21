import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: isAdmin, isLoading: adminIsLoading } = useQuery({
    queryKey: ["isAdmin", { email: user?.email }],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      return res.data.data;
    },
  });

  return [isAdmin, adminIsLoading];
};

export default useAdmin;
