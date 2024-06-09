import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { getCourseLessons, checkEnrollment } from "../../services/coursesApi";
import { FaLock } from "react-icons/fa";

const CourseLessons = () => {
  const course = useOutletContext();
  const [lessons, setLessons] = useState([]);
  const [enrollmentStatus, setEnrollmentStatus] = useState(false);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const lessonsData = await getCourseLessons(course.id);
        setLessons(lessonsData);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    const fetchEnrollmentStatus = async () => {
      try {
        const enrollmentData = await checkEnrollment(course.id);
        setEnrollmentStatus(enrollmentData.is_enrolled);
      } catch (error) {
        // console.error("Error fetching enrollment status:", error);
      }
    };

    fetchLessons();
    fetchEnrollmentStatus();
  }, [course.id]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Lessons</h2>
      {lessons?.length > 0 ? (
        <ul className="flex flex-col space-y-6">
          {lessons.map((lesson) => (
            <Link
              to={
                enrollmentStatus
                  ? `/courses/${course.id}/lessons/${lesson.id}`
                  : "#"
              }
              key={lesson.id}
            >
              <li
                className={`border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 ${
                  !enrollmentStatus && "flex justify-between items-center gap-5"
                }`}
              >
                <div>

                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {lesson.title}
                </h3>
                <p className="text-gray-600">{lesson.content}</p>
                </div>
                
                {!enrollmentStatus && (
                  <div className=" text-red-500">
                    <FaLock size={24} />
                  </div>
                )}
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">
          No lessons available for this course.
        </p>
      )}
    </div>
  );
};

export default CourseLessons;
