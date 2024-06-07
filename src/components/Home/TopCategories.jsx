import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { getCategories } from "../../services/coursesApi";

const TopCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="lg:mb-16 lg:py-5 py-16 bg-white">
        <h2 className="lg:text-3xl text-2xl text-center font-bold mb-4 uppercase">
          Browse Courses by Top Categories
        </h2>
        <div className="flex items-center justify-between p-10">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: true,
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
            {categories.map(({ id, name, image, course_count }) => (
              <SwiperSlide key={id}>
                <Link to={`/category/${id}`}>
                  <div className="border border-blue-300 hover:shadow-lg transition-shadow duration-300 hover:shadow-blue-300 py-6 px-2 mb-10">
                    <div className="flex flex-col justify-center items-center">
                      <img
                        src={
                          `http://127.0.0.1:8000${image}` ||
                          "https://via.placeholder.com/150"
                        }
                        alt={name}
                        className="w-20 h-20"
                      />
                      <h3 className="text-lg font-bold">{name}</h3>
                      <p className="text-base text-gray-500">
                        {course_count} Courses
                      </p>
                    </div>
                  </div>
                </Link>
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
