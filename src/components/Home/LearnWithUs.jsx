import React from "react";
import { FaBookOpen, FaUsers, FaClock } from "react-icons/fa";

const LearnWithUs = () => {
  return (
    <>
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
    </>
  );
};

export default LearnWithUs;
