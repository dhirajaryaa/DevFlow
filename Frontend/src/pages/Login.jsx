import React from "react";
import Input from "../components/Input/PasswordInput";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg mt-14">
        <h1 className="text-center text-2xl font-bold text-sky-500 sm:text-3xl">
          Login
        </h1>

        <form action="#" class="mt-10 w-full mx-auto max-w-sm">
          
          <div class="mt-4">
            <label for="Email" class="block text-sm font-medium text-gray-700">
              Email
            </label>

            <input type="email" id="Email" name="email" class="input-box" />
          </div>

          <Input />

          <div class="mt-5">
            <button class=" primary-btn mx-auto">Login</button>

            <p class="mt-4 text-sm text-gray-500 sm:mt-0 text-center">
              Don't have an account?
              <Link to={"/signup"} class="ml-1 text-gray-700 underline">
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
