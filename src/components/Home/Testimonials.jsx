import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import studentImage from "../../assets/student.jpg";

const Testimonials = () => {
  return (
    <>
      <section className="mb-16 bg-gray-100 p-10 md:p-20">
        <div className="flex flex-col justify-center items-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            What Our Students Say
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            About Our Services
          </h2>
        </div>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }}
          pagination={{ clickable: true }}
        >
          {[
            {
              text: "Great platform! I learned so much. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta itaque sunt culpa adipisci velit quas quis labore, ad ut eveniet!",
              name: "Agba Dev",
              role: "Web Developer",
            },
            {
              text: "Excellent courses and instructors. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque asperiores, eaque dolor maiores molestias perspiciatis.",
              name: "Agba Dev",
              role: "Web Developer",
            },
            {
              text: "Highly recommend to everyone. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam autem amet mollitia ratione quisquam dolorum.",
              name: "Agba Dev",
              role: "Web Developer",
            },
          ].map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-md md:p-5 p-10 my-10 hover:shadow-md shadow-lg">
                <p className="text-gray-400 text-lg font-semibold">
                  "{testimonial.text}"
                </p>
                <div className="flex mt-5 items-center gap-3">
                  <div>
                    <img
                      src={studentImage}
                      alt="User"
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full border cursor-pointer"
                    />
                  </div>
                  <div>
                    <p className="capitalize font-semibold text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-400 font-medium">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default Testimonials;
