import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ApiService from "../../services/ApiService";
import { toast } from "react-toastify";
import { Button, TextField } from "@mui/material";

const MyProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [bio, setBio] = useState(user?.bio || "");

  const handleErrors = (error) => {
    if (typeof error === "string") {
      toast.error(error);
    } else if (typeof error === "object") {
      Object.values(error)
        .flat()
        .forEach((message) => toast.error(message, { autoClose: 2000 }));
    } else {
      toast.error("An unexpected error occurred");
    }
  };

  const handleBioChanges = async () => {
    const updatedUser = { bio };

    try {
      const response = await ApiService.updateProfile(updatedUser);
      if (response.success) {
        setUser(response.data); // Update user in context
        toast.success("Profile updated successfully");
      } else {
        handleErrors(response.error);
      }
    } catch (error) {
      toast.error("An error occurred while updating profile");
    }
  };

  return (
    <section>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 pt-5">
        <div className="bg-white rounded-md shadow-lg w-full lg:w-1/2 p-5 lg:p-10">
          <h2 className="text-2xl text-blue-600 font-bold mb-2">About Me</h2>
          <p className="text-base text-gray-400">
            {user?.bio || (
              <>
                <div>
                  <TextField
                    placeholder="Add your Bio"
                    fullWidth
                    label="About Me"
                    multiline
                    minRows={3}
                    maxRows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
                <div className="flex justify-end items-center mt-2">
                  <Button
                    variant="contained"
                    sx={{ flex: 0.3 }}
                    onClick={handleBioChanges}
                  >
                    Update Changes
                  </Button>
                </div>
              </>
            )}
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
