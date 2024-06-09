import React, { useContext, useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import ApiService from "../../../services/ApiService";

const ProfileUpdate = () => {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profession, setProfession] = useState(user?.profession || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [nationality, setNationality] = useState(user?.nationality || "");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleUpdateChanges = async () => {
    const updatedUser = {
      name,
      email,
      profession,
      address,
      nationality,
      phone,
    };

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

  const handleProfilePictureChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();
      formData.append("profile_picture", e.target.files[0]);
      try {
        const response = await ApiService.updateProfileImage(formData);
        if (response.success) {
          setUser(formData);
          setProfilePicture(e.target.files[0]);
          toast.success("Profile picture updated successfully");
        } else {
          handleErrors(response.error);
        }
      } catch (error) {
        toast.error("hello");
      }
    }
  };

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

  return (
    <div className="bg-white p-5 sm:p-10 rounded-md flex flex-col gap-5">
      <Typography variant="h5">Update Profile</Typography>
      <div className="bg-white flex flex-col lg:w-[45%] w-full items-center justify-center p-5 sm:p-10 gap-5 rounded-md">
        <img
          src={
            profilePicture
              ? URL.createObjectURL(profilePicture)
              : `https://csc-study-api.vercel.app${user?.profile_picture}`
          }
          alt="User"
          className="w-60 rounded-full border cursor-pointer"
        />
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          type="file"
          onChange={handleProfilePictureChange}
        />
        <label htmlFor="raised-button-file">
          <Button variant="outlined" component="span">
            Change Image
          </Button>
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextField
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Profession"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          fullWidth
        />
        <TextField
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
        />
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
        />
        <TextField
          label="Nationality"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          fullWidth
        />
      </div>
      <Button variant="contained" onClick={handleUpdateChanges}>
        Save Changes
      </Button>
    </div>
  );
};

export default ProfileUpdate;
