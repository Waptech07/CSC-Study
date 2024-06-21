import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { PiBookOpenTextThin } from "react-icons/pi";
import { RiShieldCheckLine } from "react-icons/ri";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  getUserEnrollments,
  getCompletedCourses,
} from "../../services/coursesApi";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);
  const [enrolledCoursesCount, setEnrolledCoursesCount] = useState(0);
  const [completedCoursesCount, setCompletedCoursesCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Fetch user enrollments
    const fetchEnrollments = async () => {
      try {
        const enrollmentsData = await getUserEnrollments();
        setEnrolledCoursesCount(enrollmentsData.length);
      } catch (error) {
        console.error("Error fetching user enrollments:", error);
      }
    };

    // Fetch user completed courses
    const fetchCompletedCourses = async () => {
      try {
        const completedCoursesData = await getCompletedCourses();
        setCompletedCoursesCount(completedCoursesData.length);
      } catch (error) {
        console.error("Error fetching completed courses:", error);
      }
    };

    fetchEnrollments();
    fetchCompletedCourses();
  }, []);

  useEffect(() => {
    if (user.is_instructor) {
      navigate("/my-profile");
    }
  }, [user, navigate]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="lg:px-20 lg:py-10 p-5 bg-gray-100">
      <div className="flex flex-col w-full bg-white rounded-lg shadow-md">
        <div className="flex lg:flex-row flex-col items-center justify-between p-5 lg:p-10">
          <div className="flex mt-5 items-center gap-3">
            <div>
              <img
                src={
                  profilePicture
                    ? URL.createObjectURL(profilePicture)
                    : `${user?.profile_picture}`
                }
                alt="User"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border cursor-pointer"
              />
            </div>
            <div>
              <p className="capitalize font-semibold text-lg">{user?.name}</p>
              <p className="text-gray-400 font-medium">{user?.profession}</p>
            </div>
          </div>
          <div className="flex gap-10 lg:gap-20 mt-5 lg:mt-0">
            <div className="flex items-center gap-3">
              <div className="border rounded-full p-4 lg:p-5 bg-white shadow-lg hover:shadow-md">
                <PiBookOpenTextThin className="text-2xl lg:text-4xl text-blue-700" />
              </div>
              <div>
                <p className="capitalize font-bold text-lg lg:text-2xl text-gray-700">
                  {enrolledCoursesCount}
                </p>
                <p className="text-gray-400 font-medium text-sm lg:text-base">
                  Enrolled Courses
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="border rounded-full p-4 lg:p-5 bg-white shadow-lg hover:shadow-md">
                <RiShieldCheckLine className="text-2xl lg:text-4xl text-green-700" />
              </div>
              <div>
                <p className="capitalize font-bold text-lg lg:text-2xl text-gray-700">
                  {completedCoursesCount}
                </p>
                <p className="text-gray-400 font-medium text-sm lg:text-base">
                  Completed Courses
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="flex py-1 w-full justify-evenly whitespace-nowrap">
            {[
              { to: "/profile", label: "My Profile" },
              { to: "/profile/all-courses", label: "All Courses" },
              { to: "/profile/active-courses", label: "Active Courses" },
              { to: "/profile/completed-courses", label: "Completed Courses" },
              { to: "/profile/purchase-history", label: "Purchase History" },
              { to: "/profile/settings", label: "Settings" },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={`text-gray-800 text-base lg:text-lg font-semibold py-2 px-4 lg:px-6 text-center ${
                  isActive(link.to) && "border-b-4 border-blue-500 pb-1 px-2"
                }`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePage;
