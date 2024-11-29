/* eslint-disable no-unused-vars */
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./auth/login";

function App() {
  return (
    // <Router>
    <div className="relative bg-slate-900 min-h-screen">
      {/* <Routes> */}
      <div className="lg:max-w-7xl mx-auto flex justify-between items-center py-4">
        <h1 className="text-white text-2xl font-semibold">
          Get Your Translations
        </h1>
        <div className="flex space-x-3 items-center">
          <button className="py-2 px-6 rounded bg-blue-400/10 text-white font-medium text-sm">
            Login
          </button>
          <button className="py-2 px-6 rounded bg-white text-slate-900 font-medium text-sm">
            Sign up
          </button>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-5xl font-bold text-white">Wellcome</h1>
      </div>
      {/* <Route path="/login" element={<Login />} /> */}

      {/* <Route path="/register" element={<Register />} /> */}
      {/* </Routes> */}
    </div>
    // </Router>
  );
}

export default App;
