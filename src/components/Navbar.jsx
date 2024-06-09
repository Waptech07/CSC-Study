import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, MenuItem, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`bg-white shadow ${
        isFixed ? "fixed w-full top-0 z-10" : "relative"
      }`}
    >
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-blue-500 font-bold text-2xl">
            {`</>`}
          </Link>
          <Link to="/" className="text-3xl font-bold text-gray-800">
            CSC Study
          </Link>
        </div>
        <div className="hidden lg:flex space-x-10">
          <NavLink
            to="/"
            className={`text-gray-800 font-bold text-xl uppercase ${
              isActive("/") && "border-b-[3px] border-blue-500"
            }`}
          >
            Home
          </NavLink>
          <NavLink
            to="/courses"
            className={`text-gray-800 font-bold text-xl uppercase ${
              isActive("/courses") && "border-b-[3px] border-blue-500"
            }`}
          >
            Courses
          </NavLink>
          <NavLink
            to="/about"
            className={`text-gray-800 font-bold text-xl uppercase ${
              isActive("/about") && "border-b-[3px] border-blue-500"
            }`}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={`text-gray-800 font-bold text-xl uppercase ${
              isActive("/contact") && "border-b-[3px] border-blue-500"
            }`}
          >
            Contact
          </NavLink>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center">
              <img
                src={`https://csc-study-api.vercel.app${user?.profile_picture}`}
                alt="User"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={handleProfileMenuOpen}
              />
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={() => {
                    handleMobileMenuClose();
                    handleMenuClose();
                    if (user.is_instructor) {
                      navigate("/my-profile");
                    } else {
                      navigate("/profile")
                    }
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMobileMenuClose();
                    handleMenuClose();
                    logout();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <>
              <Button
                variant="outlined"
                color="inherit"
                href="/login"
                className="text-gray-800 font-bold text-xl uppercase hover:bg-gray-100 hover:text-blue-500 transition duration-300"
              >
                Login
              </Button>
              <Button
                variant="contained"
                href="/register"
                className="text-blue-500 font-bold text-xl uppercase hover:bg-blue-100 hover:text-blue-600 transition duration-300"
              >
                Register
              </Button>
            </>
          )}
        </div>
        <div className="lg:hidden flex items-center">
          <IconButton onClick={handleMobileMenuToggle}>
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            className="lg:hidden fixed inset-0 bg-white shadow-md z-20"
          >
            <div className="container mx-auto px-4 py-5 flex flex-col justify-start items-start h-full w-full">
              <div className="flex justify-between text-center mb-6">
                <div className="flex items-center space-x-2">
                  <Link to="/" className="text-blue-500 font-bold text-2xl">
                    {`</>`}
                  </Link>
                  <Link to="/" className="text-3xl font-bold text-gray-800">
                    CSC Study
                  </Link>
                </div>
                <div className="flex fixed right-3">
                  <IconButton onClick={handleMobileMenuToggle}>
                    <CloseIcon />
                  </IconButton>
                </div>
              </div>
              <NavLink
                to="/"
                onClick={handleMobileMenuToggle}
                className={`block py-2 text-gray-800 font-semibold text-xl capitalize pl-5 w-full hover:bg-blue-500 hover:text-white transition duration-300 ${
                  isActive("/") && "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Home
              </NavLink>
              <NavLink
                to="/courses"
                onClick={handleMobileMenuToggle}
                className={`block py-2 text-gray-800 font-semibold text-xl capitalize pl-5 w-full hover:bg-blue-500 hover:text-white transition duration-300 ${
                  isActive("/courses") &&
                  "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Courses
              </NavLink>
              <NavLink
                onClick={handleMobileMenuToggle}
                to="/about"
                className={`block py-2 text-gray-800 font-semibold text-xl capitalize pl-5 w-full hover:bg-blue-500 hover:text-white transition duration-300 ${
                  isActive("/about") &&
                  "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                About
              </NavLink>
              <NavLink
                onClick={handleMobileMenuToggle}
                to="/contact"
                className={`block py-2 text-gray-800 font-semibold text-xl capitalize pl-5 w-full hover:bg-blue-500 hover:text-white transition duration-300 ${
                  isActive("/contact") &&
                  "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Contact
              </NavLink>
              {isAuthenticated ? (
                <>
                  <NavLink
                    onClick={handleProfileMenuOpen}
                    className={`flex items-center justify-between py-2 text-gray-800 font-semibold text-xl capitalize pl-5 w-full hover:bg-blue-500 hover:text-white transition duration-300 ${
                      isActive("/profile/details") &&
                      "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    Profile
                    <IconButton className="pr-40">
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className={`block py-2 text-gray-800 font-semibold text-xl capitalize pl-5 w-full hover:bg-blue-500 hover:text-white transition duration-300 ${
                      isActive("/login") &&
                      "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    onClick={handleMobileMenuToggle}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={`block py-2 text-gray-800 font-semibold text-xl capitalize pl-5 w-full hover:bg-blue-500 hover:text-white transition duration-300 ${
                      isActive("/register") &&
                      "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    onClick={handleMobileMenuToggle}
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
