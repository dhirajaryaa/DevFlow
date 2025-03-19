import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Input() {
  const [showPassword, setShowPassword] = useState(false);

  function togglePassword() {
    setShowPassword(!showPassword);
  }
  return (
    <div className="relative w-full mt-4">
      <label
        htmlFor="Password"
        className="block text-sm font-medium text-gray-700"
      >
        Password
      </label>

      <input
        type={`${showPassword ? "text" : "password"}`}
        id="Password"
        name="password"
        className="input-box"
        autoComplete="new-password"
      />
      <button
        type="button"
        onClick={togglePassword}
        className="text-gray-700 size-5 absolute right-4 top-1/2"
      >
        {showPassword ? (
          <FaRegEye className="size-5" />
        ) : (
          <FaRegEyeSlash className="size-5" />
        )}
      </button>
    </div>
  );
}

export default Input;
