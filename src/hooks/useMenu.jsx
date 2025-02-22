import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useMenu = (category = "all", page = "", limit = "") => {
  const axiosSecure = useAxiosSecure();
  const query = { params: { page, limit } };

  const { data: menu, isLoading: menuIsLoading } = useQuery({
    queryKey: ["menu", { category, axiosSecure, page, limit }],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `http://localhost:5000/api/v1/menu/menu/${category}`,
        query
      );

      return res.data.data;
    },
  });

  return [menu, menuIsLoading];
};

export default useMenu;
