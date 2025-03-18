import { Link } from "react-router-dom";
import { FaWind } from "react-icons/fa";

function Logo() {
  return (
    <Link
      to={"/"}
      className="flex gap-2 items-center justify-center text-xl sm:text-3xl  font-semibold sm:font-bold capitalize tracking-wider text-sky-400"
    >
      <FaWind />
      DevFlow
    </Link>
  );
}

export default Logo;
