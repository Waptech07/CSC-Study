import React from "react";
import { Link } from "react-router-dom";
import notFound from "../assets/not-found.png"; // Ensure you have an illustration image

const NotFound = () => {
  return (
    <div className="flex items-center justify-center mb-20 -mt-14 bg-gray-100">
      <div className="text-center">
        <img
          src={notFound}
          alt="Not Found"
          className="mx-auto"
          loading="lazy"
        />
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-lg mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="text-blue-500 font-bold text-xl">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
