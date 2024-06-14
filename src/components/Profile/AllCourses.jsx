import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  getUserEnrollments,
  getCourseDetails,
} from "../../services/coursesApi";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context/AuthContext";
import NoCoursesAvailable from "../NoCoursesAvailable";

const AllCourses = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const enrollmentsData = await getUserEnrollments();
        const detailedEnrollments = await Promise.all(
          enrollmentsData.map(async (enrollment) => {
            const courseDetails = await getCourseDetails(enrollment.course);
            return { ...courseDetails, ...enrollment };
          })
        );
        setEnrollments(detailedEnrollments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user enrollments:", error);
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (enrollments.length === 0) {
    return <NoCoursesAvailable />;
  }

  return (
    <div className="bg-white p-10 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-5 text-gray-800">All Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {enrollments.map((course) => (
          <div
            key={course.id}
            className="border p-5 rounded-md shadow-sm"
          >
            <h3 className="text-lg font-bold mb-2 text-gray-700">
              {course.title}
            </h3>
            <p className="text-gray-600 mb-4">
              Instructor: {course.instructor.user.name}
            </p>
            <Link
              to={`/courses/${course.course}`}
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
