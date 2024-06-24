import React, { useState, useContext, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
import illustration from "../../assets/register.png";

const Register = () => {
  const { isAuthenticated, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    name: "",
    password: "",
    password2: "",
    gender: "",
    isInstructor: false,
  });
  const [errors, setErrors] = useState({});
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    console.log(`recaptcha ${token}`)
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      setErrors({ password2: "Passwords do not match" });
      toast.warning("Passwords do not match", { autoClose: 2000 });
      return;
    }

    if (!recaptchaToken) {
      toast.warning("Please complete the reCAPTCHA", { autoClose: 2000 });
      return;
    }

    try {
      const response = await register(
        formData.name,
        formData.username,
        formData.email,
        formData.password,
        formData.password2,
        formData.isInstructor,
        formData.gender,
        recaptchaToken
      );

      if (response.success) {
        toast.success("Registration successful!", { autoClose: 2000 });
        navigate("/");
      } else {
        setErrors(response.error);
        const errorMessages = Object.values(response.error).flat();
        errorMessages.forEach((message) =>
          toast.error(message, { autoClose: 2000 })
        );
      }
    } catch (err) {
      setErrors({ general: "Registration failed" });
      toast.error("Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-5 bg-gray-100">
      <motion.div
        className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="hidden lg:flex md:w-2/5 bg-blue-600 justify-center items-center">
          <motion.img
            src={illustration}
            alt="welcome"
            className="object-cover"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          />
        </div>
        <div className="w-full lg:w-3/5 p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Register
          </h2>
          <form className="flex flex-col gap-5" onSubmit={handleRegister}>
            <div className="flex md:flex-row flex-col gap-3">
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name ? errors.name.join(", ") : ""}
              />
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                error={!!errors.username}
                helperText={errors.username ? errors.username.join(", ") : ""}
              />
            </div>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email ? errors.email.join(", ") : ""}
            />
            <div className="flex md:flex-row flex-col gap-3">
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                error={!!errors.password}
                helperText={errors.password ? errors.password.join(", ") : ""}
              />
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                name="password2"
                value={formData.password2}
                onChange={handleInputChange}
                error={!!errors.password2}
                helperText={errors.password2 ? errors.password2 : ""}
              />
            </div>
            <FormControl variant="outlined" fullWidth error={!!errors.gender}>
              <InputLabel>Gender</InputLabel>
              <Select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
                <MenuItem value="O">Other</MenuItem>
              </Select>
              {errors.gender && (
                <Typography variant="body2" color="error">
                  {errors.gender.join(", ")}
                </Typography>
              )}
            </FormControl>
            <div className="flex md:flex-row flex-col gap-3">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isInstructor}
                    onChange={handleCheckboxChange}
                    name="isInstructor"
                    color="primary"
                  />
                }
                label="Register as Instructor"
              />
              <ReCAPTCHA
                sitekey="6Lelx_8pAAAAAJIBtaNT6ZxtGBVbjYLydJG82Zwf"
                onChange={handleRecaptchaChange}
              />
            </div>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Register
            </Button>
            <div className="flex flex-col items-center">
              <Typography variant="body2">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600">
                  Login
                </Link>
              </Typography>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
