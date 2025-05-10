import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ isLoggedIn, children }) {
  const location = useLocation();

  // 로그인 상태가 아니면 로그인 페이지로 이동 (알림 없이)
  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ fromProtected: true }} />;
  }

  return children;
}
