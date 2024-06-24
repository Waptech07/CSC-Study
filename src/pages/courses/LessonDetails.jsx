import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getLessonDetails,
  getCourseDetails,
  completeLesson,
} from "../../services/coursesApi";
import Loading from "../../components/Loading";
import { BigPlayButton, LoadingSpinner, Player } from "video-react";
import "video-react/dist/video-react.css";
import { FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const LessonDetails = () => {
  const { courseSlug, lessonSlug } = useParams();
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessonAndCourseDetails = async () => {
      try {
        const [lessonData, courseData] = await Promise.all([
          getLessonDetails(courseSlug, lessonSlug),
          getCourseDetails(courseSlug),
        ]);
        setLesson(lessonData);
        setCourse(courseData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching lesson and course details:", error);
        setLoading(false);
      }
    };

    fetchLessonAndCourseDetails();
  }, [courseSlug, lessonSlug]);

  const handleCompleteLesson = async () => {
    try {
      const response = await completeLesson(course.id, lesson.id);
      console.log("Lesson completed successfully:", response);
    } catch (error) {
      console.error("Error completing lesson:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!lesson || !course) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-center text-lg font-semibold">Lesson not found.</p>
      </div>
    );
  }

  const resources = [];

  if (lesson.documents) {
    resources.push({
      type: "Documents",
      url: `${lesson.documents}`,
    });
  }

  if (lesson.images) {
    resources.push({
      type: "Images",
      url: `${lesson.images}`,
    });
  }

  if (lesson.files) {
    resources.push({
      type: "Downloadable Files",
      url: `${lesson.files}`,
    });
  }

  return (
    <motion.section
      className="bg-gray-100 min-h-screen p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex flex-col lg:flex-row gap-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <FaSignOutAlt className="text-xl mr-2" />
          Back
        </button>
        <motion.div
          className="flex-1 bg-white p-6 rounded-lg shadow-md"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {lesson.video && (
            <div className="mb-6">
              <h2 className="text-xl text-gray-700 font-semibold mb-4">
                Course - {course.title}
              </h2>
              <Player poster={lesson.images} src={lesson.video} fluid>
                <LoadingSpinner />
                <BigPlayButton position="center" />
              </Player>
            </div>
          )}
          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            {lesson.title}
          </h1>
          <p className="text-lg text-gray-700 mb-6">{lesson.content}</p>
          {resources.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                Additional Resources
              </h2>
              <ul className="list-disc list-inside mb-4">
                {resources.map((resource, index) => (
                  <motion.li
                    key={index}
                    className="mb-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {resource.type}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <button
                onClick={handleCompleteLesson}
                className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-500 text-white font-bold transition duration-300"
              >
                Complete Lesson
              </button>
            </div>
          )}
        </motion.div>
        <motion.div
          className="lg:w-1/3 w-full bg-white p-6 rounded-lg shadow-md"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Lessons</h2>
          <ul>
            {course.lessons.map((lessonItem) => (
              <motion.li
                key={lessonItem.id}
                className={`mb-4 rounded-md ${
                  lessonItem.slug === lessonSlug
                    ? "bg-blue-500 text-white"
                    : "text-blue-800 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to={`/courses/${courseSlug}/lessons/${lessonItem.slug}`}
                  className="block px-4 py-2 transition duration-300"
                >
                  {lessonItem.title}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default LessonDetails;
