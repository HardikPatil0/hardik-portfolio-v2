import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin-panel-9xHardik" replace />;
  }

  return children;
};

export default ProtectedAdmin;
