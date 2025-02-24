import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useMenu = (category = "all", page = "", limit = "") => {
  const axiosSecure = useAxiosSecure();
  const query = { params: { page, limit } };

  const { data: menu, isLoading: menuIsLoading } = useQuery({
    queryKey: ["menu", { category, axiosSecure, page, limit }],
    queryFn: async () => {
      const res = await axiosSecure.get(`/menu/menu/${category}`, query);

      return res.data.data;
    },
  });

  return [menu, menuIsLoading];
};

export default useMenu;
