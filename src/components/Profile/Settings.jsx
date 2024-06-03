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

const Settings = () => {
  const { user, updateUser, changePassword } = useContext(AuthContext);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profession, setProfession] = useState(user?.profession || "");
  const [address, setAddress] = useState(user?.address || "");
  const [nationality, setNationality] = useState(user?.nationality || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleUpdateChanges = () => {
    const updatedUser = {
      name,
      email,
      profession,
      address,
      nationality,
      profile_picture: profilePicture,
    };
    updateUser(updatedUser);
  };

  const handlePasswordChange = () => {
    changePassword(oldPassword, newPassword);
  };

  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
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
              placeholder="Profession"
              fullWidth
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            />
            <TextField
              placeholder="Address"
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
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
