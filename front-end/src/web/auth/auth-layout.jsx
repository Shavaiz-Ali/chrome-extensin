import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-90px)] overf lg:gap-x-12">
      <div className="hidden lg:flex h-full w-full bg-slate-800 flex-col items-center justify-between gap-y-4 py-8 rounded-[16px]">
        <h1 className="text-white text-4xl font-bold w-[400px] flex flex-col text-center">
          Get Your Translations
          <span>in single click</span>
        </h1>
        <img src="/file.png" alt="" />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
