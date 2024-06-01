import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow fixed w-full z-10">
      <div className="container mx-auto px-3 py-5 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-blue-500 font-bold text-2xl">
            {`</>`}
          </Link>
          <Link to="/" className="text-3xl font-bold text-gray-800">
            CSC Study
          </Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link
            to="/courses"
            className="text-gray-800 font-bold text-xl uppercase"
          >
            Courses
          </Link>
          <Link
            to="/about"
            className="text-gray-800 font-bold text-xl uppercase"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-blue-500 font-bold text-xl uppercase"
          >
            Contact
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="outlined"
            color="inherit"
            href="/login"
            className="text-gray-800 font-bold text-xl uppercase"
          >
            Login
          </Button>
          <Button
            variant="contained"
            href="/register"
            color="primary"
            className="text-blue-500 font-bold text-xl uppercase"
          >
            Register
          </Button>
        </div>
        <div className="md:hidden flex items-center">
          <IconButton onClick={handleMobileMenuToggle}>
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link
            to="/courses"
            className="block px-4 py-2 text-gray-800 font-bold text-xl uppercase"
          >
            Courses
          </Link>
          <Link
            to="/about"
            className="block px-4 py-2 text-gray-800 font-bold text-xl uppercase"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 text-blue-500 font-bold text-xl uppercase"
          >
            Contact
          </Link>
          <Link
            to="/login"
            className="block px-4 py-2 text-gray-800 font-bold text-xl uppercase"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block px-4 py-2 text-blue-500 font-bold text-xl uppercase"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
