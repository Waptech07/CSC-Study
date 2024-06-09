import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getCoursesByCategory,
  getInstructorDetails,
} from "../../services/coursesApi";
import NoCoursesAvailable from "../../components/NoCoursesAvailable";
import Loading from "../../components/Loading";

const CategoryCoursesPage = () => {
  const { categoryId } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCoursesByCategory(categoryId);
        setCourses(data);

        if (data.length > 0) {
          setCategoryName(data[0].category.name);
        }

        const coursesWithInstructors = await Promise.all(
          data.map(async (course) => {
            const instructor = await getInstructorDetails(course.instructor);
            return { ...course, instructor };
          })
        );

        setCourses(coursesWithInstructors);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses for category:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, [categoryId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-300 min-h-screen p-8">
      <div className="mx-auto p-4 max-w-7xl">
        <h2 className="text-4xl font-bold mb-6 text-center text-white">
          {categoryName}
        </h2>
        {courses.length === 0 ? (
          <NoCoursesAvailable />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(
              ({ id, title, short_desc, image, price, instructor }) => (
                <div
                  key={id}
                  className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <Link to={`/courses/${id}`}>
                    {image && (
                      <img
                        src={`https://csc-study-api.vercel.app/${image}`}
                        alt={title}
                        className="w-full h-48 object-cover rounded-t-lg mb-4"
                      />
                    )}
                    <h3 className="text-2xl font-semibold mb-2 text-gray-900">
                      {title}
                    </h3>
                    <p className="text-base text-gray-600 mb-4">{short_desc}</p>
                  </Link>
                  <div className="flex items-center justify-between gap-4">
                    <Link
                      to={`/instructor/${instructor.id}`}
                      className="flex items-center gap-4"
                    >
                      <img
                        src={`https://csc-study-api.vercel.app${instructor?.user?.profile_picture}`}
                        alt={instructor?.user?.name}
                        className="w-12 h-12 object-cover border border-gray-300 rounded-full"
                      />
                      <p className="text-lg font-medium text-gray-800">
                        {instructor?.user?.name}
                      </p>
                    </Link>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">
                        &#8358;{price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCoursesPage;
