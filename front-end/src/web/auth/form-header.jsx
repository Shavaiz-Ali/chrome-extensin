/* eslint-disable react/prop-types */
import { Link } from "react-router";

const FormHeader = ({ formType }) => {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-5xl font-bold text-white">
        {formType === "register" ? "Create an account" : "Login"}
      </h1>
      <p className="text-white text-[14px] font-semibold">
        {formType === "register"
          ? "Already have an account?"
          : "Don't have an account?"}{" "}
        {formType === "register" ? (
          <Link className="text-blue-600" to={"/login"}>
            Login
          </Link>
        ) : (
          <Link className="text-blue-600" to={"/register"}>
            Sign Up
          </Link>
        )}
      </p>
    </div>
  );
};

export default FormHeader;
