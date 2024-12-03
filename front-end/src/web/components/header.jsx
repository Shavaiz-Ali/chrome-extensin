import { Link } from "react-router";

const Header = () => {
  return (
    <div className="flex justify-between items-center py-4">
      <Link to={"/"}>
        <span className="text-white text-2xl font-semibold sm:w-full w-[100px] line-clamp-1">
          Get Your Translations
        </span>
      </Link>
      <div className="flex space-x-3 items-center">
        <Link
          to={"/login"}
          className="py-2 px-6 rounded bg-blue-400/10 text-white font-medium text-sm"
        >
          Login
        </Link>
        <Link
          to={"/register"}
          className="py-2 px-6 rounded bg-white text-slate-900 font-medium text-sm"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Header;
