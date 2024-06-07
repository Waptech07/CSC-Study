import React from "react";
import noCoursesImage from "../assets/no-courses.jpg"
import { Link } from "react-router-dom";

const NoCoursesAvailable = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center py-16">
        <img src={noCoursesImage} alt="No Courses" className="w-64 h-64 mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Courses Available</h2>
        <p className="text-gray-600 mb-4">
          Unfortunately, there are no courses available in this category at the
          moment. Please check back later or explore other categories.
        </p>
        <Link to="/courses" className="text-blue-500 hover:underline">
          Browse Other Categories
        </Link>
      </div>
    </>
  );
};

export default NoCoursesAvailable;
