import React, { useState } from "react";
import {
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import ApiService from "../../../services/ApiService";

const PasswordChange = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }
    const response = await ApiService.changePassword(oldPassword, newPassword);
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
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <div className="bg-white p-5 sm:p-10 rounded-md flex flex-col gap-5">
      <Typography variant="h5">Change Password</Typography>
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Old Password</InputLabel>
        <OutlinedInput
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
      <FormControl variant="outlined" fullWidth>
        <InputLabel>New Password</InputLabel>
        <OutlinedInput
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
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Confirm New Password</InputLabel>
        <OutlinedInput
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
        Change Password
      </Button>
    </div>
  );
};

export default PasswordChange;
