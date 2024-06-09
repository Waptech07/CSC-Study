import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { getInstructorDetails } from "../../services/coursesApi";
import Loading from "../../components/Loading";
import { FaBookOpen, FaStar, FaUsers } from "react-icons/fa";

const ViewInstructor = () => {
  const { id } = useParams();
  const [instructor, setInstructor] = useState(null);
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const fetchedInstructor = await getInstructorDetails(id);
        setInstructor(fetchedInstructor);
      } catch (error) {
        console.error("Error fetching instructor details:", error);
      }
    };

    fetchInstructor();
  }, [id]);

  if (!instructor) {
    <Loading />;
  }

  return (
    <section className="bg-gray-100">
      <div>
        <div className="flex flex-wrap lg:flex-nowrap lg:p-10 p-5 items-start">
          <div className="flex flex-col justify-center items-center w-full lg:w-1/3 bg-white shadow-md rounded-lg py-10 gap-5">
            <img
              src={
                instructor?.user.profile_picture
                  ? `https://csc-study-api.vercel.app${instructor?.user.profile_picture}`
                  : "https://via.placeholder.com/150"
              }
              className="rounded-full w-60 h-60"
              alt="profile"
            />
            <div className="flex flex-col justify-center items-center">
              <p className="text-black font-bold text-3xl">
                {instructor?.user.name}
              </p>
              <p className="text-gray-500 font-semibold text-lg">
                {instructor?.user.profession}
              </p>
            </div>
            <hr className="w-10/12 h-px bg-gray-400 border-0 px-10 my-5" />
            <div className="px-10">
              <h2 className="text-gray-800 font-bold text-lg mb-3">About Me</h2>
              <p className="text-gray-500 font-medium text-base">
                {instructor?.user.bio}
              </p>
            </div>
            <hr className="w-10/12 h-px bg-gray-400 border-0 px-10 my-5" />
            <div className="flex justify-between items-center gap-8">
              <div className="flex flex-col items-center">
                <div className="rounded-full text-4xl p-5 bg-orange-200 text-orange-800">
                  <FaStar />
                </div>
                <p className="text-xl text-gray-700 font-semibold">5.0</p>
                <p className="text-sm text-gray-400 font-medium">Ratings</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-full text-4xl p-5 bg-green-200 text-green-800">
                  <FaUsers />
                </div>
                <p className="text-xl text-gray-700 font-semibold">200</p>
                <p className="text-sm text-gray-400 font-medium">
                  Students Learning
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-full text-4xl p-5 bg-blue-200 text-blue-800">
                  <FaBookOpen />
                </div>
                <p className="text-xl text-gray-700 font-semibold">
                  {instructor?.courses?.length}
                </p>
                <p className="text-sm text-gray-400 font-medium">Courses</p>
              </div>
            </div>
            <hr className="w-10/12 h-px bg-gray-400 border-0 px-10 my-5" />
            <div className="px-10">
              <h2 className="text-gray-800 font-bold text-lg mb-3">
                Biography
              </h2>
              <p className="text-gray-500 font-medium text-base">
                {instructor?.biography}
              </p>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex gap-5 pb-2 pl-5">
              {[
                { to: `/instructor/${instructor?.id}`, label: "Courses" },
                {
                  to: `/instructor/${instructor?.id}/details`,
                  label: "Details",
                },
              ].map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={`text-gray-800 text-sm lg:text-base font-semibold py-2 ${
                    isActive(link.to) && "border-b-4 border-blue-500 pb-1"
                  }`}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewInstructor;
