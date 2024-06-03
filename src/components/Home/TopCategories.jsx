import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import {
  FaHtml5,
  FaJsSquare,
  FaPython,
  FaJava,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";

const TopCategories = () => {
  return (
    <>
      <section className="mb-16">
        <h2 className="text-3xl text-center font-bold mb-4 uppercase">
          Browse Courses by Top Categories
        </h2>
        <div className="flex items-center justify-center p-10">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            pagination={{ clickable: true }}
          >
            {[
              {
                icon: FaHtml5,
                color: "orange-500",
                title: "Web",
                courses: 4,
              },
              {
                icon: FaJsSquare,
                color: "yellow-400",
                title: "Frontend",
                courses: 4,
              },
              {
                icon: FaNodeJs,
                color: "green-500",
                title: "Backend",
                courses: 4,
              },
              {
                icon: FaReact,
                color: "blue-500",
                title: "Full Stack",
                courses: 4,
              },
              {
                icon: FaPython,
                color: "blue-700",
                title: "Python",
                courses: 4,
              },
              {
                icon: FaJsSquare,
                color: "yellow-400",
                title: "JavaScript",
                courses: 4,
              },
              {
                icon: FaJava,
                color: "red-500",
                title: "Java",
                courses: 4,
              },
            ].map(({ icon: Icon, color, title, courses }, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`bg-white border border-${color} hover:shadow-lg transition-shadow duration-300 hover:shadow-${color} p-6 mb-10 flex flex-col justify-center items-center`}
                >
                  <Icon className={`text-${color} text-5xl mb-4`} />
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="text-base text-gray-500">{courses} Courses</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex items-center justify-center">
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

export default TopCategories;
