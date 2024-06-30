import React from "react";
import InstructorInfo from "../../components/Profile/Instructor/InstructorInfo";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const InstructorProfile = () => {
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <section className="bg-gray-100">
      <div className="flex flex-wrap lg:flex-nowrap md:p-10 sm:p-5 items-start"> {/* Use flex-wrap for responsive design */}
        <InstructorInfo />
        <div className="flex-1"> {/* Ensure it takes available space */}
          <div className="flex gap-5 pb-2 pl-5">
            {[
              { to: "/my-profile", label: "My Courses" },
              { to: "/my-profile/settings", label: "Settings" },
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
    </section>
  );
};

export default InstructorProfile;
