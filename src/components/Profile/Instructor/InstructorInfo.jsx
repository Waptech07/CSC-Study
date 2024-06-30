import React, { useContext, useState, useEffect } from "react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaFacebookF,
  FaStar,
  FaUsers,
  FaBookOpen,
} from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";
import { getInstructorDetailsByUserId } from "../../../services/coursesApi";
import Loading from "../../../components/Loading";

const InstructorInfo = () => {
  const { user } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState(null);
  const [instructorDetails, setInstructorDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructorDetails = async () => {
      try {
        const data = await getInstructorDetailsByUserId(user.id);
        setInstructorDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching instructor details:", error);
        setLoading(false);
      }
    };

    fetchInstructorDetails();
  }, [user.id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full lg:w-1/3 bg-white shadow-md rounded-lg py-10 gap-5">
      <img
        src={
          profilePicture
            ? URL.createObjectURL(profilePicture)
            : `${user?.profile_picture}`
        }
        className="rounded-full md:w-60 md:h-60 w-40 h-40"
        alt="profile-image"
      />
      <div className="flex flex-col justify-center items-center">
        <p className="text-black font-bold md:text-3xl text-2xl capitalize">
          {user?.name}
        </p>
        <p className="text-gray-500 font-semibold md:text-lg text-base">
          {user?.profession}
        </p>
      </div>
      <div className="flex gap-5 p-4">
        <div className="border rounded p-2 hover:text-white hover:bg-blue-700 cursor-pointer transition-all duration-700">
          <FaInstagram className="text-xl " />
        </div>
        <div className="border rounded p-2 hover:text-white hover:bg-blue-700 cursor-pointer transition-all duration-700">
          <FaLinkedinIn className="text-xl" />
        </div>
        <div className="border rounded p-2 hover:text-white hover:bg-blue-700 cursor-pointer transition-all duration-700">
          <FaTwitter className="text-xl" />
        </div>
        <div className="border rounded p-2 hover:text-white hover:bg-blue-700 cursor-pointer transition-all duration-700">
          <FaYoutube className="text-xl" />
        </div>
        <div className="border rounded p-2 hover:text-white hover:bg-blue-700 cursor-pointer transition-all duration-700">
          <FaFacebookF className="text-xl" />
        </div>
      </div>
      <hr className="w-10/12 h-px bg-gray-400 border-0 px-10 my-5" />
      <div className="flex lg:justify-between justify-center items-center md:gap-2 gap-8 lg:px-0 px-5 ">
        <div className="flex flex-col items-center  justify-center">
          <div className="rounded-full text-4xl p-5 bg-orange-200 text-orange-800">
            <FaStar />
          </div>
          <p className="text-xl text-gray-700 font-semibold">5.0</p>
          <p className="text-sm md:text-xs text-center text-gray-400 font-medium">
            Ratings
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="rounded-full text-4xl p-5 bg-green-200 text-green-800">
            <FaUsers />
          </div>
          <p className="text-xl text-gray-700 font-semibold">200</p>
          <p className="text-sm md:text-xs text-center text-gray-400 font-medium">
            Students Learning
          </p>
        </div>
        <div className="flex flex-col items-center  justify-center">
          <div className="rounded-full text-4xl p-5 bg-blue-200 text-blue-800">
            <FaBookOpen />
          </div>
          <p className="text-xl text-gray-700 font-semibold">
            {instructorDetails?.courses?.length}
          </p>
          <p className="text-sm md:text-xs text-center text-gray-400 font-medium">
            Courses
          </p>
        </div>
      </div>
      <hr className="w-10/12 h-px bg-gray-400 border-0 px-10 my-5" />
      <div className="px-10">
        <h2 className="text-gray-800 font-bold text-lg mb-3">About Me</h2>
        <p className="text-gray-500 font-medium text-base">{user?.bio}</p>
      </div>
      <div className="px-10">
        <h2 className="text-gray-800 font-bold text-lg mb-3">Biography</h2>
        <p className="text-gray-500 font-medium text-base">
          {instructorDetails?.biography}
        </p>
      </div>
    </div>
  );
};

export default InstructorInfo;
