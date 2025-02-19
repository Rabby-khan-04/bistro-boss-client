import axios from "axios";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

const useAxiosSecure = () => {
  useEffect(() => {
    const interceptor = axiosSecure.interceptors.request.use(
      (config) => config,
      (err) => {
        console.log(err);
        return Promise.reject(err);
      }
    );

    return () => {
      axiosSecure.interceptors.response.eject(interceptor);
    };
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
