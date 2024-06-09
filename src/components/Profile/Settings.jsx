import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  Button,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import ApiService from "../../services/ApiService";

const Settings = () => {
  const { user, setUser } = useContext(AuthContext); // Use setUser to update user context
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profession, setProfession] = useState(user?.profession || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [nationality, setNationality] = useState(user?.nationality || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        toast.error("Network Error");
      }
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }
    const response = await ApiService.changePassword(
      oldPassword,
      newPassword,
      confirmNewPassword
    );
    if (response.success) {
      toast.success("Password changed successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } else {
      handleErrors(response.error);
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

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <section>
      <div className="flex lg:flex-row flex-col-reverse items-start justify-between gap-10">
        <div className="flex flex-col gap-20 w-full">
          <div className="flex flex-col gap-5 bg-white lg:p-10 p-5 rounded-md">
            <h2 className="text-lg font-bold">Edit Your Information</h2>
            <div className="flex lg:flex-col flex-row gap-5">
              <TextField
                placeholder="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                placeholder="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <TextField
              placeholder="Address"
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="flex lg:flex-col flex-row gap-5">
              <TextField
                placeholder="Profession"
                fullWidth
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              />
              <TextField
                placeholder="Phone"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex lg:flex-col flex-row gap-5 w-full">
              <TextField
                placeholder="Nationality"
                sx={{ flex: 1 }}
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{ flex: 0.3 }}
                onClick={handleUpdateChanges}
              >
                Update Changes
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-5 bg-white p-5 sm:p-10 rounded-md">
            <h2 className="text-lg font-bold">Change Password</h2>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="password">Old Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Old Password"
              />
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="new-password">New Password</InputLabel>
              <OutlinedInput
                id="new-password"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="New Password"
              />
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="confirm-new-password">
                Confirm New Password
              </InputLabel>
              <OutlinedInput
                id="confirm-new-password"
                type={showPassword ? "text" : "password"}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm New Password"
              />
            </FormControl>
            <Button variant="contained" onClick={handlePasswordChange}>
              Save Changes
            </Button>
          </div>
        </div>
        <div className="bg-white flex flex-col lg:w-[45%] w-full items-center justify-center p-5 sm:p-10 gap-5 rounded-md">
          <img
            src={
              profilePicture
                ? URL.createObjectURL(profilePicture)
                : `http://127.0.0.1:8000${user?.profile_picture}`
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
      </div>
    </section>
  );
};

export default Settings;
