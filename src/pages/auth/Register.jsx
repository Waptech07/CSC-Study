import React, { useState, useContext } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import illustration from "../../assets/register.png";

const Register = () => {
  const { isAuthenticated, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});

  if (isAuthenticated) {
    navigate("/");
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setErrors({ password2: "Passwords do not match" });
      toast.warning("Passwords do not match", { autoClose: 2000 });
      return;
    }

    try {
      const response = await register(name, email, password, password2);

      if (response.success) {
        toast.success("Registration successful!", { autoClose: 2000 });
        navigate("/");
      } else {
        console.error("Registration errors:", response.error);
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
    <div className="flex flex-col items-center justify-center pt-10 bg-gray-100">
      <motion.div
        className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="hidden md:flex md:w-1/2 bg-blue-600 justify-center items-center">
          <motion.img
            src={illustration}
            alt="welcome"
            className="object-cover"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Register
          </h2>
          <form className="flex flex-col gap-6" onSubmit={handleRegister}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name ? errors.name.join(", ") : ""}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email ? errors.email.join(", ") : ""}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password ? errors.password.join(", ") : ""}
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              error={!!errors.password2}
              helperText={errors.password2 ? errors.password2 : ""}
            />
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
