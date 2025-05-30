import React, { useState, useEffect, useContext } from "react";
import { getActiveCourses, getCourseDetails } from "../../services/coursesApi";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import NoCoursesAvailable from "../NoCoursesAvailable";

const ActiveCourses = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [activeCourses, setActiveCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveCourses = async () => {
      try {
        const activeCoursesData = await getActiveCourses();
        const detailedActiveCourses = await Promise.all(
          activeCoursesData.map(async (course) => {
            const courseDetails = await getCourseDetails(course.course.slug);
            return { ...courseDetails, ...course };
          })
        );
        setActiveCourses(detailedActiveCourses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching active courses:", error);
        setLoading(false);
      }
    };

    fetchActiveCourses();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (activeCourses.length === 0) {
    return <NoCoursesAvailable />;
  }

  return (
    <div className="bg-white p-10 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-5 text-gray-800">Active Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {activeCourses.map((course) => (
          <div
            key={course.id}
            className="border p-5 rounded-md shadow-sm"
          >
            <h3 className="text-lg font-bold mb-2 text-gray-700">
              {course.title}
            </h3>
            <p className="text-gray-600 mb-4">Progress: {course.progress}%</p>
            <Link
              to={`/courses/${course.slug}`}
              className="text-blue-500 hover:underline"
            >
              Continue Course
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveCourses;
