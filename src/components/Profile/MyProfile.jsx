import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <section>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 pt-5">
        <div className="bg-white rounded-md shadow-lg w-full lg:w-1/2 p-5 lg:p-10">
          <h2 className="text-2xl text-blue-600 font-bold mb-2">About Me</h2>
          <p className="text-base text-gray-400">
            Hello my name is Tanya. I am a designer. My personal qualities are
            responsibility, as I bring everything to its logical conclusion,
            determination, never rest on my laurels, always open to change and
            something new. In my arsenal there are such programs as Adobe
            Photoshop, Illustrator, InDesign, Figma, also some Maya, 3ds Max
            ZBrush, Substance Painter, Marvelous Designer.
          </p>
        </div>
        <div className="bg-white rounded-md shadow-lg w-full lg:w-1/2 p-5 lg:p-10">
          <h2 className="text-2xl text-black font-bold mb-2">
            Personal Details
          </h2>
          <p className="text-base text-gray-400 font-semibold flex items-center justify-left gap-5 lg:gap-x-28">
            <span className="text-blue-600 font-semibold w-24 lg:w-[30px]">
              Name
            </span>{" "}
            {user?.name}
          </p>
          <p className="text-base text-gray-400 font-semibold flex items-center justify-left gap-5 lg:gap-x-28">
            <span className="text-blue-600 font-semibold w-24 lg:w-[30px]">
              Email
            </span>{" "}
            {user?.email}
          </p>
          <p className="text-base text-gray-400 font-semibold flex items-center justify-left gap-5 lg:gap-x-28">
            <span className="text-blue-600 font-semibold w-24 lg:w-[30px]">
              Profession
            </span>{" "}
            {user?.profession}
          </p>
          <p className="text-base text-gray-400 font-semibold flex items-center justify-left gap-5 lg:gap-x-28">
            <span className="text-blue-600 font-semibold w-24 lg:w-[30px]">
              Address
            </span>{" "}
            {user?.address}
          </p>
          <p className="text-base text-gray-400 font-semibold flex items-center justify-left gap-5 lg:gap-x-28">
            <span className="text-blue-600 font-semibold w-24 lg:w-[30px]">
              Phone
            </span>{" "}
            {user?.phone}
          </p>
          <p className="text-base text-gray-400 font-semibold flex items-center justify-left gap-5 lg:gap-x-28">
            <span className="text-blue-600 font-semibold w-24 lg:w-[30px]">
              Nationality
            </span>{" "}
            {user?.nationality}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
