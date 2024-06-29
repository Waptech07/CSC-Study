import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, FreeMode } from "swiper/modules";
import {
  getCourses,
  getInstructorDetails,
  getCategories,
  getCoursesByCategory,
} from "../../services/coursesApi";
import Loading from "../Loading";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";

const OurPopularCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let fetchedCourses;
        if (selectedCategory !== null) {
          fetchedCourses = await getCoursesByCategory(selectedCategory);
        } else {
          fetchedCourses = await getCourses();
        }
        const coursesWithInstructors = await Promise.all(
          fetchedCourses.map(async (course) => {
            const instructor = await getInstructorDetails(
              course.instructor.slug
            );
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

        // Filter out categories that do not have any courses
        const categoryPromises = fetchedCategories.map(async (category) => {
          const coursesInCategory = await getCoursesByCategory(category.slug);
          return coursesInCategory.length > 0 ? category : null;
        });

        const results = await Promise.all(categoryPromises);
        const filtered = results.filter((category) => category !== null);
        setFilteredCategories(filtered.slice(0, 5)); // Limit to first 5 categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (categorySlug) => {
    setSelectedCategory(categorySlug);
  };

  if (loading) {
    return (
      <section className="bg-gray-100 md:p-20 p-10 flex flex-col justify-center items-center">
        <Loading />
      </section>
    );
  }

  return (
    <section className="bg-gray-100 md:p-20 p-10">
      <div className="flex justify-between items-center mb-10 w-full">
        <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold capitalize">
          Our Popular Courses
        </h2>
        <div className="relative overflow-visible lg:w-full hover:overflow-x-auto">
          <div className="flex py-1 justify-evenly whitespace-nowrap font-semibold text-gray-600 space-x-4 border-b-2 border-white transition-all duration-300">
            <p
              className={`cursor-pointer transition-colors duration-300 px-2 py-1 ${
                selectedCategory === null
                  ? "border-b-4 border-blue-500 text-blue-500"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleCategoryChange(null)}
            >
              All
            </p>
            {filteredCategories.map((category) => (
              <p
                key={category.id}
                className={`cursor-pointer transition-colors duration-300 px-2 py-1 ${
                  selectedCategory === category.slug
                    ? "border-b-4 border-blue-500 text-blue-500"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleCategoryChange(category.slug)}
              >
                {category.name}
              </p>
            ))}
          </div>
        </div>
      </div>
      <Swiper
        modules={[Navigation, Scrollbar, FreeMode]}
        scrollbar={{ hide: false }}
        freeMode={true}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          600: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        navigation
        className="pb-10"
      >
        {courses.map((course) => (
          <SwiperSlide key={course.id}>
            <div className="bg-white mb-10 border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 h-full flex flex-col hover:shadow-md">
              <img
                src={course.image || "https://via.placeholder.com/150"}
                alt={course.title}
                className="w-full h-48"
                // loading="lazy"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 capitalize">
                  {course.title.length > 30
                    ? `${course.title.substring(0, 30)}...`
                    : course.title}
                </h3>
                <p className="mb-2 text-gray-600 flex-grow">
                  {course.short_desc.length > 40
                    ? `${course.short_desc.substring(0, 40)}...`
                    : course.short_desc}
                </p>
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const rating = course.average_rating;
                    const roundedRating = Math.round(rating * 2) / 2;
                    if (index + 1 <= roundedRating) {
                      return (
                        <StarIcon
                          key={index}
                          className="h-5 w-5 text-yellow-500"
                        />
                      );
                    } else if (index + 0.5 === roundedRating) {
                      return (
                        <StarHalfIcon
                          key={index}
                          className="h-5 w-5 text-yellow-500"
                        />
                      );
                    } else {
                      return (
                        <StarIcon
                          key={index}
                          className="h-5 w-5 text-gray-300"
                        />
                      );
                    }
                  })}
                  <span className="ml-2 text-gray-600">
                    ({course.average_rating.toFixed(1)})
                  </span>
                </div>
                <Link
                  to={`/courses/${course.slug}`}
                  className="text-blue-500 hover:underline mt-auto"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex items-center justify-center mt-10">
        <Link
          to="/courses"
          className="flex items-center justify-center w-60 uppercase bg-blue-500 text-base text-white font-bold px-6 py-4 rounded-md shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Browse All Courses
        </Link>
      </div>
    </section>
  );
};

export default OurPopularCourses;
