import React from "react";
import { Link } from "react-router-dom";

const ActiveCourses = () => {
  const courses = [
    { id: 1, title: "React for Beginners", progress: 50 },
    { id: 2, title: "Advanced JavaScript", progress: 75 },
  ];

  return (
    <div className="bg-white p-10 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-5">Active Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course) => (
          <div key={course.id} className="border p-5 rounded-md shadow-sm">
            <h3 className="text-lg font-bold mb-2">{course.title}</h3>
            <p className="text-gray-600 mb-4">Progress: {course.progress}%</p>
            <Link to={`/course/${course.id}`} className="text-blue-500 hover:underline">
              Continue Course
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveCourses;
