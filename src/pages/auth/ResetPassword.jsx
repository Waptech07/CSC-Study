import React, { useContext, useEffect, useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";
import { AuthContext } from "../../context/AuthContext";

const ResetPassword = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await ApiService.resetPassword(uid, token, newPassword);
      if (response.success) {
        toast.success("Password reset successful!");
        setMessage(
          "Password reset successful. You can now log in with your new password."
        );
      } else {
        setErrors(response.error);
        const errorMessages = Object.values(response.error).flat();
        errorMessages.forEach((message) =>
          toast.error(message, { autoClose: 2000 })
        );
      }
    } catch (err) {
      toast.error("Please Check Your Internet Connection");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 bg-gray-100">
      <motion.div
        className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden max-w-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full p-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Reset Password
          </h2>
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <TextField
              label="New Password"
              type="password"
              variant="outlined"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleResetPassword}
            >
              Reset Password
            </Button>
          </form>
          {message && (
            <Typography
              variant="body2"
              className="text-center mt-4 text-green-600"
            >
              {message}
            </Typography>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
