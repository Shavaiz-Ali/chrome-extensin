/* eslint-disable react/prop-types */
import { Link } from "react-router";
import FormHeader from "./form-header";

const AuthForm = ({ type, formdata, setFormdata }) => {
  return (
    <div className="flex justify-center items-center flex-col gap-y-4 w-full h-full">
      <FormHeader formType={type} />
      <form className="space-y-4 w-full">
        {type === "register" && (
          <div className="flex gap-x-3 w-full items-center">
            <div className="w-full">
              <input
                className="w-full border-none text-white rounded-[4px] bg-slate-800 text-[14px] font-medium py-3 px-2"
                type="text"
                placeholder="First name"
                // value={formdata.username}
                // onChange={(e) =>
                //   setFormdata({ ...formdata, username: e.target.value })
                // }
              />
            </div>
            <div className="w-full">
              <input
                className="w-full border-none text-white rounded-[4px] bg-slate-800 text-[14px] font-medium py-3 px-2"
                type="text"
                placeholder="Last name"
                // value={formdata.username}
                // onChange={(e) =>
                //   setFormdata({ ...formdata, username: e.target.value })
              />
            </div>
          </div>
        )}
        <div className="w-full">
          <input
            className="w-full border-none text-white rounded-[4px] bg-slate-800 text-[14px] font-medium py-3 px-2"
            type="text"
            placeholder="Email"
            // value={formdata.username}
            // onChange={(e) =>
            //   setFormdata({ ...formdata, username: e.target.value })
            // }
          />
        </div>
        <div className="w-full">
          <input
            className="w-full border-none text-white rounded-[4px] bg-slate-800 text-[14px] font-medium py-3 px-2"
            type="text"
            placeholder="Password"
            // value={formdata.username}
            // onChange={(e) =>
            //   setFormdata({ ...formdata, username: e.target.value })
            // }
          />
        </div>
        <div className="w-full flex items-center gap-x-2">
          <input
            className="cursor-pointer"
            type="checkbox"
            id="terms"
            name="terms"
          />
          <label
            htmlFor="terms"
            className="text-white text-[14px] font-semibold cursor-pointer"
          >
            I agree to the{" "}
            <Link className="text-blue-600" to="#">
              terms and conditions
            </Link>
          </label>
        </div>
        <div className="space-y-4 mt-6">
          <button
            className="bg-blue-600 text-white rounded-[4px] w-full py-4 cursor-pointer text-sm font-medium"
            type="submit"
          >
            {type === "register" ? "Create account" : "Login"}
          </button>
          <div className="flex justify-between items-center w-full">
            <div className="h-0.5 bg-slate-800 w-full" />
            <p className="text-white text-sm font-medium w-full text-center">
              Or continue with
            </p>
            <div className="h-0.5 bg-slate-800 w-full" />
          </div>
          <div className="flex justify-center items-center gap-x-3">
            <button className="py-4 w-full bg-transparent border border-blue-600 text-sm text-white font-medium rounded-[4px]">
              Github
            </button>
            <button className="py-4 w-full bg-transparent border border-blue-600 text-sm text-white font-medium rounded-[4px]">
              Google
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
