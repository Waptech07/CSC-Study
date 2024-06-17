import React, { useState, useContext, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import illustration from "../../assets/login.png";

const Login = () => {
  const { isAuthenticated, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username_or_email, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await login(username_or_email, password);
      setLoading(false);
      if (response.success) {
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(response.error || "Invalid credentials");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Please Check Your Internet Connection");
    }
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
            alt="welcome"
            className="object-cover"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          />
        </div>
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <TextField
              label="Username or Email"
              variant="outlined"
              fullWidth
              value={username_or_email}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link
              to="/forgot-password"
              className="text-blue-600 text-end -mt-4"
            >
              Forgot password?
            </Link>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="flex flex-col mt-4">
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600">
                Register
              </Link>
            </Typography>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
