import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useMenu = (category = "all", page = "", limit = "") => {
  const axiosSecure = useAxiosSecure();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const query = { params: { page, limit } };

    axiosSecure
      .get(`http://localhost:5000/api/v1/menu/menu/${category}`, query)
      .then((res) => {
        setMenu(res.data.data);
        setLoading(false);
      });
  }, [category, axiosSecure, page, limit]);

  return [menu, loading];
};

export default useMenu;
