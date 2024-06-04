import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "../../assets/hero.png";

const Hero = () => {
  return (
    <>
      <section className="text-center mb-20 bg-gradient-to-r from-blue-100 to-blue-200 md:py-10 py-28 md:px-10 px-5">
        <div className="flex items-center justify-evenly flex-col-reverse md:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-4 w-full md:w-1/2 text-left p-5"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 leading-tight capitalize">
              Welcome to CSC Study
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-gray-600">
              Your one-stop platform for all your study needs. Our mission is to
              help people find the best courses online and learn with experts
              anytime, anywhere.
            </p>
            <Link
              to="/courses"
              className="flex items-center justify-center bg-blue-500 text-white font-bold w-44 px-6 py-3 rounded-md shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Explore Courses
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-full md:w-1/2 md:block hidden"
          >
            <img src={heroImage} alt="Hero" loading="lazy" />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
