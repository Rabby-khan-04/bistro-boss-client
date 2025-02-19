import SocialLogin from "@/components/Auth/SocialLogin";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "@/assets/others/authentication2.png";
import loginBg from "@/assets/others/authentication.png";
import useAuth from "@/hooks/useAuth";

const Signup = () => {
  const navigate = useNavigate();
  const { createUser } = useAuth();
  const handleSignup = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    createUser(email, password)
      .then((result) => {
        form.reset();
        const loggedUser = result.user;
        console.log(loggedUser);
      })
      .catch((error) => {
        console.log(error);
      });
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
            <div className="col-span-2">
              <h2 className="text-neutral text-5xl font-bold font-inter text-center">
                Sign Up
              </h2>
              <form onSubmit={handleSignup} className="font-inter space-y-7">
                <div className="space-y-4">
                  <label className="text-xl font-semibold text-neutral inline-block">
                    <span>Name</span>
                  </label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Enter you name"
                    className="p-8 bg-white"
                  />
                </div>
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

                <input
                  type="submit"
                  value={"Sign Up"}
                  className="block w-full p-6 bg-gold border-gold btn-block text-xl text-white font-bold capitalize rounded-[8px] cursor-pointer disabled:bg-gold/40"
                />
              </form>
              <div className="text-center font-inter mt-8">
                <Link
                  to="/signin"
                  className="text-center text-gold text-xl font-semibold"
                >
                  Already registered? Sign In
                </Link>
              </div>
              <SocialLogin />
            </div>
            <div className="col-span-3 self-center justify-self-end ">
              <img src={loginImg} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
