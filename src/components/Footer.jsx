import React, { useRef, useEffect } from "react";
import {
  FaArrowAltCircleUp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const topRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Set the top reference on initial render
    topRef.current = document.documentElement || document.body;
  }, []);

  return (
    <footer className="bg-black bg-opacity-90 text-gray-500">
      <div className="mx-auto">
        <div className="flex lg:flex-row flex-col lg:px-24 px-5 py-20 justify-between space-x-10">
          <div className="flex flex-col lg:w-1/2 lg:pr-40">
            <div className="flex items-center space-x-2">
              <Link to="/" className="text-blue-500 font-bold text-3xl">
                {`</>`}
              </Link>
              <Link to="/" className="text-3xl font-bold text-white">
                CSC Study
              </Link>
            </div>
            <p className="text-lg py-3 font-semibold">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Similique illum asperiores ullam perspiciatis, optio deserunt
              accusantium commodi cumque facilis temporibus.
            </p>
            <div className="flex gap-3 py-4">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-gray-600 p-1.5 text-white hover:bg-blue-500 hover:border-gray-900 transition-all duration-500"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-gray-600 p-1.5 text-white hover:bg-blue-500 hover:border-gray-900 transition-all duration-500"
              >
                <FaLinkedinIn className="text-xl" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-gray-600 p-1.5 text-white hover:bg-blue-500 hover:border-gray-900 transition-all duration-500"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-gray-600 p-1.5 text-white hover:bg-blue-500 hover:border-gray-900 transition-all duration-500"
              >
                <FaYoutube className="text-xl" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-gray-600 p-1.5 text-white hover:bg-blue-500 hover:border-gray-900 transition-all duration-500"
              >
                <FaFacebookF className="text-xl" />
              </a>
            </div>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-2 lg:w-1/2 gap-20">
            <div className="flex flex-col gap-2">
              <h2 className="text-white text-2xl font-semibold mb-2">
                Company
              </h2>
              <Link
                to="/"
                className="text-lg font-medium hover:text-white hover:text-opacity-75"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-lg font-medium hover:text-white hover:text-opacity-75"
              >
                About
              </Link>
              <Link
                to="/blog"
                className="text-lg font-medium hover:text-white hover:text-opacity-75"
              >
                Blog
              </Link>
              <Link
                to="/courses"
                className="text-lg font-medium hover:text-white hover:text-opacity-75"
              >
                Courses
              </Link>
              <Link
                to="/contact"
                className="text-lg font-medium hover:text-white hover:text-opacity-75"
              >
                Contact
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-white text-2xl font-semibold mb-2">
                Support
              </h2>
              <Link
                to="/help-support"
                className="text-lg font-medium hover:text-white hover:text-opacity-75"
              >
                Help & Supports
              </Link>
              <Link
                to="/privacy-policy"
                className="text-lg font-medium hover:text-white hover:text-opacity-75"
              >
                Privacy Policy
              </Link>
              <Link
                to="/faqs"
                className="text-lg font-medium hover:text-white hover:text-opacity-75"
              >
                FAQs
              </Link>
              <Link
                to="/contact"
                className="text-lg font-medium hover:text-white hover:text-opacity-75"
              >
                Contact
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-white text-2xl font-semibold mb-2">
                Quick Links
              </h2>
              <Link
                to="/about"
                className="text-lg font-medium hover:text-white hover:text-opacity-75"
              >
                About Us
              </Link>
              <Link
                to="/blog"
                className="text-lg font-medium hover:text-white hover:text-opacity-75"
              >
                Blog
              </Link>
              <Link
                to="/courses"
                className="text-lg font-medium hover:text-white hover:text-opacity-75"
              >
                Courses
              </Link>
              <Link
                to="/contact"
                className="text-lg font-medium hover:text-white hover:text-opacity-75"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
        <div>
          <hr className="w-full h-px bg-gray-600 border-0" />
          <div className="flex justify-between">
            <p className="py-4 lg:pl-24 pl-5 text-lg font-semibold">
              &copy; {new Date().getFullYear()} CSC Study. All rights reserved.
            </p>
            <p
              onClick={scrollToTop}
              className="lg:text-lg text-base font-bold flex items-center lg:pr-10 pr-5 gap-2 cursor-pointer"
            >
              Go to Top
              <FaArrowAltCircleUp className="lg:text-2xl text-lg" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
