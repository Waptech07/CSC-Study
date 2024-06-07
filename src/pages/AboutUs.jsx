import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaHandshake, FaGlobe } from "react-icons/fa";
import aboutImg from "../assets/about.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import OurBestInstructors from "../components/Home/OurBestInstructors";
import varsityOne from "../assets/varsity/1.png";
import varsityTwo from "../assets/varsity/2.png";
import varsityThree from "../assets/varsity/3.png";
import varsityFour from "../assets/varsity/4.png";
import varsityFive from "../assets/varsity/5.png";

const AboutUsPage = () => {
  return (
    <section className="bg-white">
      <div>
        <h2 className="text-4xl text-gray-700 font-bold text-center pt-20">
          About Us
        </h2>
        <div className="flex lg:flex-row flex-col justify-center items-center gap-5 lg:px-20 px-20 pt-20 pb-40">
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5 }}
            className="lg:w-1/2 w-full"
          >
            <img src={aboutImg} alt="Contact Us" className="rounded-xl" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 w-full space-y-5"
          >
            <h2 className="lg:text-4xl text-2xl lg:font-extrabold font-medium capitalize">
              A Great Place to grow.
            </h2>
            <p className="text-gray-400 text-base font-semibold">
              We are dedicated to providing top-notch education to learners all
              over the world. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Voluptatum deserunt distinctio, quo necessitatibus cumque
              adipisci optio harum impedit itaque quas? Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Aspernatur, nisi.
            </p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 mx-10 justify-center items-center">
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5 }}
          >
            <div className=" rounded-md border hover:shadow-md cursor-pointer">
              <div className="flex flex-col items-center justify-center p-3">
                <FaUsers size={100} className="text-blue-500" />
                <h2 className="font-bold text-2xl">Our Team</h2>
                <p className="text-base text-gray-600 text-center">
                  Our team consists of experienced professionals who are
                  passionate about education.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5 }}
          >
            <div className=" rounded-md border hover:shadow-md cursor-pointer">
              <div className="flex flex-col items-center justify-center p-3">
                <FaHandshake size={100} className="text-green-500" />
                <h2 className="font-bold text-2xl">Our Mission</h2>
                <p className="text-base text-gray-600 text-center">
                  To empower individuals through high-quality education and
                  training.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5 }}
          >
            <div className=" rounded-md border hover:shadow-md cursor-pointer">
              <div className="flex flex-col items-center justify-center p-3">
                <FaGlobe size={100} className="text-purple-500" />
                <h2 className="font-bold text-2xl">Our Vision</h2>
                <p className="text-base text-gray-600 text-center">
                  To be a global leader in online education and lifelong
                  learning.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="bg-gray-100 lg:px-20 lg:py-20 px-2 py-20 text-center">
          <div className="flex flex-col justify-center items-center gap-5 pb-14 lg:px-80 px-10">
            <h2 className="text-4xl text-gray-800 font-bold">
              Over 30,000+ Schools & College Learning With Us.
            </h2>
            <p className="text-base text-gray-400 font-semibold">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure a
              minima sit hic blanditiis ullam assumenda magni voluptates harum
              eveniet?
            </p>
          </div>
          <div className="flex justify-between items-center px-10">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={2}
              autoplay={{
                delay: 2000,
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
              <div className="flex gap-5 items-center justify-center">
                <SwiperSlide>
                  <div>
                    <img src={varsityOne} alt="school" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={varsityTwo} alt="school" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={varsityThree} alt="school" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={varsityFour} alt="school" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={varsityFive} alt="school" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={varsityOne} alt="school" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={varsityTwo} alt="school" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={varsityThree} alt="school" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={varsityFour} alt="school" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <img src={varsityFive} alt="school" />
                  </div>
                </SwiperSlide>
              </div>
            </Swiper>
          </div>
        </div>
        <OurBestInstructors />
      </div>
    </section>
  );
};

export default AboutUsPage;
