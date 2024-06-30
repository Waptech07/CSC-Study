import React from "react";
import { Link } from "react-router-dom";
import Category from "./Category";

const BlogNavbar = ({ setSelectedCategory, setSearchQuery }) => {
  return (
    <>
      <nav className="md:block hidden">
        <div className="flex justify-between items-center px-10 py-5 leading-10 bg-white">
          <div className="flex items-end space-x-2">
            <div className="space-x-2">
              <Link to="/" className="text-blue-500 font-bold text-xl">
                {`</>`}
              </Link>
              <Link to="/" className="text-2xl font-bold text-gray-800">
                CSC Study
              </Link>
            </div>
            <Link to="/blog" className="text-xl font-normal text-gray-800">
              Blog
            </Link>
          </div>
          <div className="flex gap-4">
            <Link
              to="/courses"
              className="border border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white px-3 py-1 transition-all duration-300"
            >
              Browse Our Courses
            </Link>
            <Link
              to="/register"
              className="font-semibold bg-blue-600 text-white hover:bg-blue-800 px-3 py-1 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
      <nav className="md:hidden">
        <div className="flex justify-between items-center px-10 py-5 leading-10 bg-white">
          <div className="flex items-center space-x-2">
            <Link to="/" className="text-blue-500 font-bold text-xl">
              {`</>`}
            </Link>
            <Link to="/" className="text-2xl font-bold text-gray-800">
              CSC Study
            </Link>
          </div>
          <div>
            <Link to="/blog" className="text-xl font-normal text-gray-800">
              Blog
            </Link>
          </div>
        </div>
      </nav>
      <div>
        <Category
          setSelectedCategory={setSelectedCategory}
          setSearchQuery={setSearchQuery}
        />
      </div>
    </>
  );
};

export default BlogNavbar;
