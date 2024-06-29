import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { getInstructors } from "../../services/coursesApi";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import malePlaceholder from "../../assets/male-placeholder.jpg";
import femalePlaceholder from "../../assets/female-placeholder.jpg";

const OurBestInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const data = await getInstructors();
        setInstructors(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Instructors:", error);
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="mb-16 p-10 md:p-20">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        Meet Our Best Instructors
      </h2>
      <div className="lg:px-0 md:px-10 px-12">
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            600: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          pagination={{ clickable: true }}
        >
          {instructors.map((instructor, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white border my-10 hover:shadow-md">
                <Link to={`/instructor/${instructor.slug}`}>
                  <img
                    src={
                      instructor.user.profile_picture ||
                      (instructor.user.gender === "M"
                        ? malePlaceholder
                        : instructor.user.gender === "F"
                        ? femalePlaceholder
                        : "https://via.placeholder.com/150")
                    }
                    alt={instructor.user.name}
                    className="w-full h-60"
                  />
                  <div className="p-4 h-24">
                    <h3 className="text-lg md:text-xl font-bold mb-2 capitalize">
                      {instructor.user.name}
                    </h3>
                    <p>{instructor.user.profession}</p>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default OurBestInstructors;
