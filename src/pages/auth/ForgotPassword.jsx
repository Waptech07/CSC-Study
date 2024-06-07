import React, { useContext, useEffect, useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiService from "../../services/ApiService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { isAuthenticated} = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  const handleForgotPassword = async () => {
    try {
      const response = await ApiService.forgotPassword(email);
      if (response.success) {
        toast.success("Password reset email sent");
        setMessage("Password reset email sent. Please check your inbox.");
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
            Forgot Password
          </h2>
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleForgotPassword}
            >
              Send Reset Email
            </Button>
          </form>
          {message && (
            <Typography variant="body2" className="text-center mt-4 text-green-600">
              {message}
            </Typography>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
