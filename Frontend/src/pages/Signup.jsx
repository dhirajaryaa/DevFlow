import { RiLoaderLine } from "react-icons/ri";
import PasswordInput from "../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../app/auth/authApi";

function Signup() {
  const [onSignup, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    await onSignup(data).unwrap().then(() => {
      navigate('/login')
    });
  };
  
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg mt-14">
        <h1 className="text-center text-2xl font-bold text-sky-500 sm:text-3xl">
          Signup
        </h1>

        <form onSubmit={handleSubmit} className="mt-10 w-full mx-auto max-w-sm">
          <div className="mt-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>

            <input type="text" id="name" name="name" className="input-box" />
          </div>

          <div className="mt-4">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input type="email" id="Email" name="email" className="input-box" />
          </div>

          <PasswordInput />

          <div className="mt-5">
            <button className=" primary-btn mx-auto">
              {isLoading ? <RiLoaderLine /> : "Signup"}
            </button>

            <p className="mt-4 text-sm text-gray-500 text-center">
              Already have an account?
              <Link to={"/login"} className="ml-1 text-gray-700 underline">
                Login
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
