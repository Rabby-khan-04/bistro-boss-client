import SocialLogin from "@/components/Auth/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import loginImg from "@/assets/others/authentication2.png";
import loginBg from "@/assets/others/authentication.png";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "@/hooks/useAuth";

const Signin = () => {
  const [disabledBtn, setDisabledBtn] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from.pathname || "/";
  const { signIn } = useAuth();

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);

        Swal.fire({
          title: "Successfully login!!",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleValidateCaptch = (e) => {
    const user_captcha_value = e.target.value;
    if (user_captcha_value.length === 6) {
      if (validateCaptcha(user_captcha_value) == true) {
        setDisabledBtn(false);
      } else {
        setDisabledBtn(true);
      }
    } else {
      return;
    }
  };

  return (
    <>
      <title>Bistro Boss | Sign In</title>
      <section style={{ backgroundImage: `url(${loginBg})` }} className="py-28">
        <div className="container">
          <div
            className="grid grid-cols-5 pb-12 pt-14 px-32"
            style={{ boxShadow: "10px 10px 10px 10px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="col-span-3 self-center">
              <img src={loginImg} alt="" />
            </div>
            <div className="col-span-2">
              <h2 className="text-neutral text-5xl font-bold font-inter text-center">
                Sign In
              </h2>
              <form onSubmit={handleSubmit} className="font-inter space-y-7">
                <div className="space-y-4">
                  <label className="text-xl font-semibold text-neutral inline-block">
                    <span>Email</span>
                  </label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter you email"
                    className="p-8 bg-white"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-xl font-semibold text-neutral inline-block">
                    <span>Password</span>
                  </label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="p-8 bg-white"
                  />
                </div>

                <div className="space-y-4">
                  <LoadCanvasTemplate />
                  <div className=" flex flex-row">
                    <Input
                      type="text"
                      onChange={handleValidateCaptch}
                      name="captch"
                      placeholder="Type the captch"
                      className="p-8 bg-white flex-grow rounded-r-none"
                    />
                  </div>
                </div>
                <input
                  type="submit"
                  disabled={disabledBtn}
                  value={"Sign In"}
                  className="block w-full p-6 bg-gold border-gold btn-block text-xl text-white font-bold capitalize rounded-[8px] cursor-pointer disabled:bg-gold/40"
                />
              </form>
              <div className="text-center font-inter mt-8">
                <Link
                  to="/signup"
                  className="text-center text-gold text-xl font-semibold"
                >
                  New here? Create a New Account
                </Link>
              </div>
              <SocialLogin />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
