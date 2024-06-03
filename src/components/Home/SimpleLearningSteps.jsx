import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage2 from "../../assets/hero-img-01.jpg";
import l03 from "../../assets/vectors/l03.png";
import l04 from "../../assets/vectors/l04.png";

const SimpleLearningSteps = () => {
  return (
    <>
      <section>
        <div className="flex items-center justify-center lg:flex-row flex-col-reverse lg:pt-16 lg:pb-28 pb-10">
          <motion.div className="w-full lg:w-1/2 lg:px-10 md:px-20 md:pt-20 px-5">
            <h2 className="text-5xl font-bold mb-10 pl-5">
              CSC Study Simple Learning Steps
            </h2>
            <div className="flex flex-col gap-0">
              <div className="flex items-center bg-white px-4 py-2 gap-4">
                <div className="bg-blue-100 rounded-full p-5">
                  <p className="text-blue-600 text-2xl font-semibold">01.</p>
                </div>
                <div>
                  <h3 className="text-2xl text-gray-800 font-semibold mb-1">
                    Make Your Own Place.
                  </h3>
                  <p className="text-base text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Illo, enim..
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-white px-4 py-2 gap-4">
                <div className="bg-blue-100 rounded-full p-5">
                  <p className="text-blue-600 text-2xl font-semibold">02.</p>
                </div>
                <div>
                  <h3 className="text-2xl text-gray-800 font-semibold mb-1">
                    Find The Best Courses.
                  </h3>
                  <p className="text-base text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                    delectus reiciendis optio reprehenderit quam. Porro!
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-white px-4 py-2 gap-4">
                <div className="bg-blue-100 rounded-full p-5">
                  <p className="text-blue-600 text-2xl font-semibold">03.</p>
                </div>
                <div>
                  <h3 className="text-2xl text-gray-800 font-semibold mb-1">
                    And Become a Master in Your Field.
                  </h3>
                  <p className="text-base text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Earum veritatis sed molestias, vel labore laudantium!
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-10">
                <Link
                  to="/register"
                  className="flex items-center justify-center w-48 uppercase bg-blue-500 text-base text-white font-bold px-6 py-4 rounded-md shadow-lg hover:bg-blue-600 transition duration-300"
                >
                  Start Learning
                </Link>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 md:w-1/2 lg:pl-20 lg:pr-5 md:p-0 p-14 relative"
          >
            <img
              src={l03}
              alt="Hero2"
              className="absolute md:-top-12 top-2 left-64 z-[5]"
            />
            <img src={heroImage2} alt="Hero2" className="rounded-lg z-[4]" />
            <img
              src={l04}
              alt="Hero2"
              className="absolute md:-bottom-24 -bottom-12 right-48 -z-[4]"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default SimpleLearningSteps;
