import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const user = useSelector((state) => state.userReducer.data);

  if (!user) return <Navigate to="/login" />;

  if (adminOnly && !user.isAdmin) return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
