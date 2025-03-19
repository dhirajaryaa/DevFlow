import React from "react";
import Input from "../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../app/auth/authApi";
import { LuLoaderCircle } from "react-icons/lu";
import { setUser } from "../app/auth/authReducer";
import { useDispatch } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [onLogin, { isLoading }] = useLoginUserMutation();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    await onLogin(data)
      .unwrap()
      .then((data) => {
        dispatch(setUser(data?.user));
        navigate('/dashboard')
      });
  };
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg mt-14">
        <h1 className="text-center text-2xl font-bold text-sky-500 sm:text-3xl">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="mt-10 w-full mx-auto max-w-sm">
          <div className="mt-4">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input type="email" id="Email" name="email" className="input-box" />
          </div>

          <Input />

          <div className="mt-5">
            <button className=" primary-btn mx-auto">
              {isLoading ? <LuLoaderCircle  className="size-6 animate-spin mx-auto" /> : "Login"}
            </button>

            <p className="mt-4 text-sm text-gray-500 text-center">
              Don't have an account?
              <Link to={"/signup"} className="ml-1 text-gray-700 underline">
                Signup
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
