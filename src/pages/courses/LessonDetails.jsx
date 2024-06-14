import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getLessonDetails,
  getCourseDetails,
  completeLesson,
} from "../../services/coursesApi"; // Import CompleteLesson from coursesApi
import Loading from "../../components/Loading";
import { BigPlayButton, LoadingSpinner, Player } from "video-react";
import "video-react/dist/video-react.css"; // import video-react styles

const LessonDetails = () => {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessonAndCourseDetails = async () => {
      try {
        const [lessonData, courseData] = await Promise.all([
          getLessonDetails(courseId, lessonId),
          getCourseDetails(courseId),
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
  }, [courseId, lessonId]);

  const handleCompleteLesson = async () => {
    try {
      const response = await completeLesson(courseId, lessonId);
      // Call CompleteLesson with courseId and lessonId
      console.log("Lesson completed successfully:", response);
      // You might want to update the UI or state based on the response, e.g., set a completion status
    } catch (error) {
      console.error("Error completing lesson:", error);
      // Handle errors, e.g., show an error message to the user
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
    <section className="bg-gray-100">
      <div className="flex lg:flex-row flex-col justify-center items-start lg:space-x-8">
        <div className="lg:max-w-3xl w-full bg-white p-8 lg:rounded-lg lg:shadow-md">
          {lesson.video && (
            <div className="mb-8 relative">
              <h2 className="lg:text-2xl text-xl text-gray-700 font-semibold">
                Course - {course.title}
              </h2>
              <Player
                poster={lesson.images}
                src={`${lesson.video}`}
                fluid={true}
                width={720}
                height={405}
              >
                <LoadingSpinner />
                <BigPlayButton position="center" />
              </Player>
            </div>
          )}
          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            {lesson.title}
          </h1>
          <p className="text-lg text-gray-700 mb-8">{lesson.content}</p>
          {resources.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                Additional Resources
              </h2>
              <ul className="list-disc list-inside">
                {resources.map((resource, index) => (
                  <li key={index} className="mb-2">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {resource.type}
                    </a>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleCompleteLesson}
                className="px-2 py-4 rounded-md bg-green-700 hover:bg-green-600 text-white font-bold"
              >
                Complete Lesson
              </button>
            </div>
          )}
        </div>
        <div className="lg:w-64 w-full bg-white p-3 lg:rounded-lg lg:shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 pl-3">
            Lessons
          </h2>
          <ul>
            {course.lessons.map((lesson) => (
              <li
                key={lesson.id}
                className={`mb-4 rounded ${
                  lesson.id === parseInt(lessonId)
                    ? "bg-blue-500 text-white"
                    : "text-blue-800"
                }`}
              >
                <Link
                  to={`/courses/${courseId}/lessons/${lesson.id}`}
                  className="block px-6 py-2 hover:text-black hover:bg-gray-300"
                >
                  {lesson.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LessonDetails;
