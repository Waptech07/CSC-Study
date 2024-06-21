import React, { useState, useEffect, useContext } from "react";
import {
  getCompletedCourses,
  getCourseDetails,
} from "../../services/coursesApi";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import NoCoursesAvailable from "../NoCoursesAvailable";

const CompletedCourses = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedCourses = async () => {
      try {
        const completedCoursesData = await getCompletedCourses();
        const detailedCompletedCourses = await Promise.all(
          completedCoursesData.map(async (course) => {
            const courseDetails = await getCourseDetails(course.course.slug);
            return { ...courseDetails, ...course };
          })
        );
        setCompletedCourses(detailedCompletedCourses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching completed courses:", error);
        setLoading(false);
      }
    };

    fetchCompletedCourses();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (completedCourses.length === 0) {
    return <NoCoursesAvailable />;
  }

  return (
    <div className="bg-white p-10 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-5 text-gray-800">
        Completed Courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {completedCourses.map((course) => (
          <div
            key={course.id}
            className="border p-5 rounded-md shadow-sm"
          >
            <h3 className="text-lg font-bold mb-2 text-gray-700">
              {course.title}
            </h3>
            <p className="text-gray-600 mb-4">
              Completed on:{" "}
              <span className="text-gray-800 font-semibold">
                {new Date(course.completed_at).toLocaleDateString()}
              </span>
            </p>
            <Link to={""} className="text-blue-500 hover:underline">
              View Certificate
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedCourses;
