import React, { useState, useEffect } from "react";
import {
  getCourses,
  getInstructorDetails,
  searchCourses,
  getCategories,
  getCoursesByCategory,
} from "../../services/coursesApi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import NoCoursesAvailable from "../../components/NoCoursesAvailable";
import Loading from "../../components/Loading";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let fetchedCourses;
        if (selectedCategory) {
          fetchedCourses = await getCoursesByCategory(selectedCategory);
        } else {
          fetchedCourses = await getCourses();
        }
        const coursesWithInstructors = await Promise.all(
          fetchedCourses.map(async (course) => {
            const instructor = await getInstructorDetails(course.instructor);
            return { ...course, instructor };
          })
        );
        setCourses(coursesWithInstructors);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses or instructors:", error);
      }
    };

    fetchCourses();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const searchResults = await searchCourses(searchQuery);
      const coursesWithInstructors = await Promise.all(
        searchResults.map(async (course) => {
          const instructor = await getInstructorDetails(course.instructor);
          return { ...course, instructor };
        })
      );
      setCourses(coursesWithInstructors);
    } catch (error) {
      console.error("Error searching courses:", error);
    }
  };

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="bg-gray-100 mx-auto p-6">
      <h1 className="text-5xl font-bold text-center mb-12">
        Available Courses
      </h1>
      <div className="flex justify-between items-center mb-12 flex-col md:flex-row">
        <form
          onKeyUp={handleSearch}
          className="flex items-center w-full md:w-1/3 mb-4 md:mb-0"
        >
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search for courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-4 py-2 border rounded-l-md"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition duration-300"
            >
              Search
            </button>
          </div>
        </form>
        <select
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="ml-0 md:ml-4 px-4 py-2 border rounded-md w-full md:w-auto"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <Loading />
      ) : courses.length === 0 ? (
        <NoCoursesAvailable />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
            >
              <Link to={`/courses/${course.id}`}>
                <img
                  src={
                    `${course.image}` ||
                    "https://via.placeholder.com/150"
                  }
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-6">
                <Link to={`/courses/${course.id}`}>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    {course.title}
                  </h2>
                </Link>
                <p className="text-gray-600 mb-4">{course.short_desc}</p>
                <Link to={`/instructor/${course.instructor.id}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={`${course.instructor?.user?.profile_picture}`}
                        alt={course.instructor.user.name}
                        className="w-10 h-10 rounded-full mr-2"
                      />
                      <p className="text-gray-800 font-semibold">
                        {course.instructor.user.name}
                      </p>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">
                      &#8358;{course.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
