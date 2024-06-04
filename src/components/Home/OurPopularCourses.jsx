import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import courseImage from "../../assets/course.png";

const OurPopularCourses = () => {
  return (
    <>
      <section className="bg-gray-100 md:p-20 p-10">
        <div className="flex justify-between items-center mb-10">
          <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold capitalize">
            Our Popular Courses
          </h2>
          <div className="flex md:flex-row flex-col font-semibold text-gray-600 space-x-4 border-b-2 border-white">
            <p className="border-b-4 border-blue-500 cursor-pointer">All</p>
            <p className="cursor-pointer hover:text-blue-500">
              Web Development
            </p>
            <p className="cursor-pointer hover:text-blue-500">
              Backend Development
            </p>
            <p className="cursor-pointer hover:text-blue-500">Java</p>
            <p className="cursor-pointer hover:text-blue-500">Python</p>
          </div>
        </div>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          navigation
          className="pb-10"
        >
          {[
            {
              id: 1,
              title: "Web Development with HTML, CSS & JavaScript",
              description: "Brief description of the course.",
            },
            {
              id: 2,
              title: "Learn MERN Stack Development for Beginners",
              description: "Brief description of the course.",
            },
            {
              id: 3,
              title: "Get Started With Python From Beginner to Intermediate",
              description: "Brief description of the course.",
            },
          ].map((course, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white border border-gray-200 rounded-t-lg mb-4 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <img
                  src={courseImage}
                  alt="Course"
                  className="w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 capitalize">
                    {course.title}
                  </h3>
                  <p className="mb-2 text-gray-600">{course.description}</p>
                  <Link
                    to={`/course/${course.id}`}
                    className="text-blue-500 hover:underline"
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
    </>
  );
};

export default OurPopularCourses;
