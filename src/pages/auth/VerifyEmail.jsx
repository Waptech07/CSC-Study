import React, { useState, useEffect, useContext } from "react";
import { Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import illustration from "../../assets/login.png";

const VerifyEmail = () => {
  const { verifyEmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState(null);

  useEffect(() => {
    const handleVerification = async () => {
      try {
        const response = await verifyEmail(uid, token);
        if (response.success) {
          setVerificationStatus("success");
          toast.success("Email verified successfully!", { autoClose: 2000 });
        } else {
          setVerificationStatus("error");
          toast.error("Verification failed. Please try again.", { autoClose: 2000 });
        }
      } catch (err) {
        setVerificationStatus("error");
        toast.error("Network error. Please try again.", { autoClose: 2000 });
      } finally {
        setLoading(false);
      }
    };
    handleVerification();
  }, [uid, token, verifyEmail]);

  const handleLoginNavigation = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 bg-gray-100">
      <motion.div
        className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="hidden md:flex md:w-1/2 bg-blue-600 justify-center items-center">
          <motion.img
            src={illustration}
            alt="verify email"
            className="object-cover"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Email Verification
          </h2>
          {loading ? (
            <Typography variant="h6" className="text-center">
              Verifying your email...
            </Typography>
          ) : verificationStatus === "success" ? (
            <Typography variant="h6" className="text-center text-green-600">
              Your email has been verified successfully!
            </Typography>
          ) : (
            <Typography variant="h6" className="text-center text-red-600">
              Verification failed. Please try again.
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLoginNavigation}
            className="mt-4"
          >
            Go to Login
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
