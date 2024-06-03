// Home.jsx
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  FaHtml5,
  FaJsSquare,
  FaPython,
  FaJava,
  FaNodeJs,
  FaReact,
  FaBookOpen,
  FaUsers,
  FaClock,
} from "react-icons/fa";
import heroImage from "../assets/hero.png";
import heroImage2 from "../assets/hero-img-01.jpg";
import l03 from "../assets/vectors/l03.png";
import l04 from "../assets/vectors/l04.png";
import courseImage from "../assets/course.png";
import instructorImage from "../assets/instructor.jpg";
import studentImage from "../assets/student.jpg";

const Home = () => {
  return (
    <div className="mx-auto overflow-hidden">
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
            <img src={heroImage} alt="Hero" />
          </motion.div>
        </div>
      </section>

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

      <section className="bg-gray-100 p-20">
        <div className="flex justify-between items-center mb-10">
          <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold capitalize">
            Our Popular Courses
          </h2>
          <div className="flex md:flex-row flex-col font-semibold text-gray-600 space-x-4 border-b-2 border-white">
            <p className="border-b-4 border-blue-500 cursor-pointer">All</p>
            <p className="cursor-pointer hover:text-blue-500">
              Web Development
            </p>
            <p className="cursor-pointer hover:text-blue-500">
              Backend Development
            </p>
            <p className="cursor-pointer hover:text-blue-500">Java</p>
            <p className="cursor-pointer hover:text-blue-500">Python</p>
          </div>
        </div>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          navigation
          className="pb-10"
        >
          {[
            {
              id: 1,
              title: "Web Development with HTML, CSS & JavaScript",
              description: "Brief description of the course.",
            },
            {
              id: 2,
              title: "Learn MERN Stack Development for Beginners",
              description: "Brief description of the course.",
            },
            {
              id: 3,
              title: "Get Started With Python From Beginner to Intermediate",
              description: "Brief description of the course.",
            },
          ].map((course, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white border border-gray-200 rounded-t-lg mb-4 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <img
                  src={courseImage}
                  alt="Course"
                  className="w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 capitalize">
                    {course.title}
                  </h3>
                  <p className="mb-2 text-gray-600">{course.description}</p>
                  <Link
                    to={`/course/${course.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-center mt-10">
          <Link
            to="/courses"
            className="flex items-center justify-center w-60 uppercase bg-blue-500 text-base text-white font-bold px-6 py-4 rounded-md shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Browse All Courses
          </Link>
        </div>
      </section>

      <section className="mb-16 bg-gray-200 px-10 py-20">
        <h2 className="text-4xl text-center text-gray-800 font-bold mb-10">
          Why You Should Learn With CSC Study
        </h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {[
            {
              icon: FaBookOpen,
              color: "green-700",
              title: "500 Online Courses",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda rem quae ex quaerat tempore saepe.",
            },
            {
              icon: FaUsers,
              color: "blue-500",
              title: "Expert Instructors",
              description:
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis officiis aut est dolorem eligendi quia sunt ad?",
            },
            {
              icon: FaClock,
              color: "red-500",
              title: "Lifetime Access",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A doloribus placeat sed quo perferendis tenetur debitis ex magni.",
            },
          ].map(({ icon: Icon, color, title, description }, index) => (
            <div
              key={index}
              className={`bg-white border rounded transition-all duration-500 hover:border-${color} hover:shadow-md hover:shadow-${color} p-8`}
            >
              <div
                className={`flex bg-${color} items-center justify-center p-4 mb-4 w-20 rounded-md`}
              >
                <Icon className="text-5xl text-white" />
              </div>
              <h3 className="text-2xl text-gray-800 font-semibold mb-2">
                {title}
              </h3>
              <p className="text-gray-500 text-lg">{description}</p>
            </div>
          ))}
        </div>
      </section>
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

      <section>
        <div className="flex flex-col md:flex-row items-center justify-center pt-10 pb-20 md:pb-28">
          <motion.div className="w-full md:w-1/2">
            <img src={instructorImage} alt="Instructor" className="w-full" />
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

      <section className="mb-16">
        <div className="flex flex-col justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg text-left border-2 p-10 md:m-0 mx-5">
            <h2 className="text-4xl font-bold mb-4 capitalize text-gray-800">
              Subscribe to our Newsletter
            </h2>
            <p className="mb-4 text-gray-500">
              Subscribe to our newsletter to stay updated with our latest
              courses and offers.
            </p>
            <div className="flex flex-row items-center w-full">
              <TextField
                type="email"
                label="Enter your email"
                variant="outlined"
                fullWidth
                className="bg-white rounded-r-none"
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                className="text-white h-14 px-8 py-3 rounded-l-none"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
