import React from "react";
import { Link } from "react-router-dom";

const AllCourses = () => {
  const courses = [
    { id: 1, title: "React for Beginners", instructor: "John Doe" },
    { id: 2, title: "Advanced JavaScript", instructor: "Jane Smith" },
    { id: 3, title: "Python Programming", instructor: "Alice Johnson" },
    { id: 4, title: "Machine Learning Basics", instructor: "Bob Brown" },
  ];

  return (
    <div className="bg-white p-10 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-5">All Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course) => (
          <div key={course.id} className="border p-5 rounded-md shadow-sm">
            <h3 className="text-lg font-bold mb-2">{course.title}</h3>
            <p className="text-gray-600 mb-4">
              Instructor: {course.instructor}
            </p>
            <Link
              to={`/course/${course.id}`}
              className="text-blue-500 hover:underline"
            >
              View Course
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
