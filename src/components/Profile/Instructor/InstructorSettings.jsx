import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import ProfileUpdate from "./ProfileUpdate";
import PasswordChange from "./PasswordChange";
import CoursesManagement from "./CoursesManagement";
import { toast } from "react-toastify";
import { Tabs, Tab, Box } from "@mui/material";
import { getInstructorDetailsByUserId } from "../../../services/coursesApi";

const InstructorSettings = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const profileData = await getInstructorDetailsByUserId(user.id);
      setProfile(profileData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Error fetching user profile");
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-semibold text-4xl text-center">Settings</h2>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Profile" />
        <Tab label="Change Password" />
        <Tab label="Manage Courses" />
      </Tabs>
      <Box className="m-5">
        {tabIndex === 0 && <ProfileUpdate profile={profile} />}
        {tabIndex === 1 && <PasswordChange />}
        {tabIndex === 2 && <CoursesManagement user={user} />}
      </Box>
    </div>
  );
};

export default InstructorSettings;
