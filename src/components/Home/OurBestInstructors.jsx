import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import instructorImage from "../../assets/instructor.jpg";

const OurBestInstructors = () => {
  return (
    <>
      <section className="mb-16 p-10 md:p-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Meet Our Best Instructors
        </h2>
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: {
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
          {[
            {
              name: "Victory Elijah",
              title: "Web Developer",
              image: instructorImage,
            },
            {
              name: "Sarah Johnson",
              title: "Frontend Developer",
              image: instructorImage,
            },
            {
              name: "Michael Brown",
              title: "Backend Developer",
              image: instructorImage,
            },
            {
              name: "Emily Davis",
              title: "Full Stack Developer",
              image: instructorImage,
            },
            {
              name: "Daniel Wilson",
              title: "Data Scientist",
              image: instructorImage,
            },
            {
              name: "Sophia Miller",
              title: "UX/UI Designer",
              image: instructorImage,
            },
            {
              name: "James Anderson",
              title: "DevOps Engineer",
              image: instructorImage,
            },
            {
              name: "Olivia Martinez",
              title: "Mobile Developer",
              image: instructorImage,
            },
          ].map((instructor, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white border my-10 hover:shadow-md">
                <img
                  src={instructor.image}
                  alt="Instructor"
                  className="w-full"
                />
                <div className="p-4">
                  <h3 className="text-lg md:text-xl font-bold mb-2">
                    {instructor.name}
                  </h3>
                  <p>{instructor.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default OurBestInstructors;
