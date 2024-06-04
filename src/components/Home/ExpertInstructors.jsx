import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import instructorImage from "../../assets/instructor.jpg";

const ExpertInstructors = () => {
  return (
    <>
      <section>
        <div className="flex flex-col md:flex-row items-center justify-center pt-10 pb-20 md:pb-28">
          <motion.div className="w-full md:w-1/2">
            <img src={instructorImage} alt="Instructor" loading="lazy" className="w-full" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-full md:w-1/2 text-left p-5 md:p-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 leading-tight capitalize">
              Learn With Expert Instructors
            </h1>
            <p className="text-lg md:text-xl mb-6 text-gray-600">
              Our team of expert instructors are here to provide top-notch
              education and support to help you achieve your learning goals.
            </p>
            <Link
              to="/courses"
              className="flex items-center justify-center bg-blue-500 text-white font-bold w-40 md:w-44 px-4 md:px-6 py-2 md:py-3 rounded-md shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ExpertInstructors;
