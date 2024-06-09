import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { getCourseLessons } from "../../services/coursesApi";

const CourseLessons = () => {
  const course = useOutletContext();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const lessonsData = await getCourseLessons(course.id);
        setLessons(lessonsData);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
  }, [course.id]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Lessons</h2>
      {lessons?.length > 0 ? (
        <ul className="flex flex-col space-y-6">
          {lessons.map((lesson) => (
            <Link to={`/courses/${course.id}/lessons/${lesson.id}`}>
              <li
                key={lesson.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {lesson.title}
                </h3>
                <p className="text-gray-600">{lesson.content}</p>
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
