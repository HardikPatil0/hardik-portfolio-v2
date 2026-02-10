import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-5xl font-extrabold text-red-500">404</h1>
      <p className="text-gray-300 mt-3">Page not found</p>
      <Link
        to="/"
        className="mt-6 bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-lg font-bold"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
