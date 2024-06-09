import React from "react";
import { useOutletContext } from "react-router-dom";
import { FaClock, FaCalendarAlt, FaMoneyBillWave, FaBookOpen } from "react-icons/fa";

const CourseOverview = () => {
  const course = useOutletContext();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-blue-600">Course Overview</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4 capitalize">
        {course?.short_desc}
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        {course?.description}
      </p>
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center text-gray-600">
          <FaMoneyBillWave className="mr-2 text-2xl text-blue-600" />
          <span className="text-lg">&#8358;{course.price.toLocaleString()}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FaClock className="mr-2 text-2xl text-yellow-400" />
          <span className="text-lg">Duration: {course?.duration}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FaCalendarAlt className="mr-2 text-2xl text-red-600" />
          <span className="text-lg">Created At: {new Date(course?.created_at).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FaCalendarAlt className="mr-2 text-2xl text-red-800" />
          <span className="text-lg">Updated At: {new Date(course?.updated_at).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="flex items-center text-gray-600">
        <FaBookOpen className="mr-2 text-2xl text-green-600" />
        <span className="text-lg">{course?.lessons.length} Lessons</span>
      </div>
    </div>
  );
};

export default CourseOverview;
