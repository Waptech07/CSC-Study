import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";

const ProtectedRoute = ({ children }) => {
  const { user, loading, isAuthenticated } = useContext(AuthContext);

  if (loading) {
    // Show a loading indicator while user data is being fetched
    return (
      <Loading/>
    );
  }

  if (!isAuthenticated && !user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
