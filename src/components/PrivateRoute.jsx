import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    alert("로그인 후 이용 가능합니다.");
    return <Navigate to="/login" replace />;
  }
  return children;
}
