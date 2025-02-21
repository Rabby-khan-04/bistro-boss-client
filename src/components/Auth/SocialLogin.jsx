import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from.pathname || "/";

  const handleGoogleSignin = () => {
    googleSignIn()
      .then((result) => {
        const loggedInUser = result.user;
        const userInfo = {
          name: loggedInUser.displayName,
          email: loggedInUser.email,
        };
        axiosSecure
          .post("/users/user", userInfo)
          .then((res) => {
            if (res.data.data.insertedId) {
              Swal.fire({
                icon: "success",
                title: "User registered successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          })
          .catch((err) => {
            console.log(err);
          });

        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mt-6 text-center">
      <h2 className="text-xl font-inter font-medium text-[#444] mb-4">
        Or Sign in With
      </h2>
      <div className="space-x-14">
        <button className="p-4 border border-neutral rounded-full hover:bg-neutral hover:text-white transition-all duration-300">
          <FaFacebookF className="text-2xl cursor-pointer inline-block" />
        </button>
        <button
          onClick={handleGoogleSignin}
          className="p-4 border border-neutral rounded-full hover:bg-neutral hover:text-white transition-all duration-300"
        >
          <FaGoogle className="text-2xl cursor-pointer inline-block" />
        </button>
        <button className="p-4 border border-neutral rounded-full hover:bg-neutral hover:text-white transition-all duration-300">
          <FaGithub className="text-2xl cursor-pointer inline-block" />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
