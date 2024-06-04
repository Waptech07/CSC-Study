import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { PiBookOpenTextThin } from "react-icons/pi";
import { RiShieldCheckLine } from "react-icons/ri";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState(null);
  const location = useLocation();

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
                    : `http://127.0.0.1:8000${user?.profile_picture}`
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
                  24
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
                  19
                </p>
                <p className="text-gray-400 font-medium text-sm lg:text-base">
                  Completed Courses
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-evenly pb-1">
          {[
            { to: "/profile/details", label: "My Profile" },
            { to: "/profile/all-courses", label: "All Courses" },
            { to: "/profile/active-courses", label: "Active Courses" },
            { to: "/profile/completed-courses", label: "Completed Courses" },
            { to: "/profile/purchase-history", label: "Purchase History" },
            { to: "/profile/settings", label: "Settings" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={`text-gray-800 text-sm lg:text-lg font-semibold py-2 ${
                isActive(link.to) && "border-b-4 border-blue-500 pb-1"
              }`}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePage;
