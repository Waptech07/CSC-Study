import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getInstructorDetails } from "../../../services/coursesApi";

const ViewInstructorCourses = () => {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [instructor, setInstructor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const secondsAgo = Math.floor((now - date) / 1000);

    if (secondsAgo < 60) {
      return "Just now";
    } else if (secondsAgo < 3600) {
      const minutes = Math.floor(secondsAgo / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (secondsAgo < 86400) {
      const hours = Math.floor(secondsAgo / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString(undefined, options);
    }
  };

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const fetchedInstructor = await getInstructorDetails(id);
        setInstructor(fetchedInstructor);
        setCourses(fetchedInstructor?.courses || []);
      } catch (error) {
        console.error("Error fetching instructor details:", error);
      }
    };

    fetchInstructor();
  }, [id]);

  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(courses.length / coursesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="w-11/12 pl-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {currentCourses.map((course, index) => (
          <Link to={`/courses/${course.id}`}>
            <div
              key={index}
              className="bg-white hover:shadow-md rounded-lg transition-transform transform"
            >
              <img
                src={
                  course.image
                    ? `http://127.0.0.1:8000${course.image}`
                    : "https://via.placeholder.com/150"
                }
                className="w-full h-60 rounded-t-lg mb-3"
                alt={course.title}
              />
              <div className="px-2 py-4">
                <h3 className="text-gray-800 font-bold text-xl mb-3">
                  {course.title}
                </h3>
                <p className="text-gray-500 font-medium text-base mb-2">
                  {timeAgo(course.created_at)}
                </p>
                <p className="text-gray-800 font-semibold text-lg">
                  &#8358;{course.price.toLocaleString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`mx-1 px-4 py-2 text-white rounded ${
              currentPage === number ? "bg-blue-500" : "bg-gray-400"
            } hover:bg-blue-600 transition-colors duration-300`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ViewInstructorCourses;
