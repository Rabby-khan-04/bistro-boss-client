import auth from "@/firebase/firebase.config";
import axios from "axios";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://bistro-boss-server-eta-puce.vercel.app/api/v1",
  withCredentials: true,
});

const useAxiosSecure = () => {
  // const navigate = useNavigate();
  // const { logOut } = useAuth();
  useEffect(() => {
    const interceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        config.headers.authorization = `Bearer ${token}`;
        return config;
      },
      (err) => {
        console.log(err);
        return Promise.reject(err);
      }
    );

    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error) {
        const status = error.response.status;
        if (status === 401 || status === 403) {
          // await logOut();
          // navigate("/signin");
          await signOut(auth);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.response.eject(interceptor);
    };
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
