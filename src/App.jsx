import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate, Link } from "react-router-dom";
import Home from "./pages/Home";
import Scholarships from "./pages/Scholarships";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const navigate = useNavigate();

  // 로그인 상태 확인 (토큰 확인)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // 토큰이 있으면 true, 없으면 false
  }, []); // 첫 로드 시 한 번 실행

  const handleLogin = () => {
    localStorage.setItem("token", "mockToken"); // 토큰 저장
    setIsLoggedIn(true); // 로그인 상태 업데이트
    navigate("/"); // 홈으로 이동
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // 토큰 삭제
    setIsLoggedIn(false); // 로그인 상태 업데이트
    navigate("/"); // 홈으로 이동
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          {/* ScholarMate 클릭 시 홈으로 이동 */}
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h1>ScholarMate</h1>
          </Link>
        </div>
        <nav className="nav">
          <Link to="/scholarships" className="nav-btn">장학금</Link>
          <Link to="/recommendations" className="nav-btn">추천</Link>
          <Link to="/community" className="nav-btn">커뮤니티</Link>
          <Link to="/calendar" className="nav-btn">캘린더</Link>
          <Link to="/support" className="nav-btn">고객센터</Link>
        </nav>
        <div className="header-right">
          {/* 로그인 상태에 따른 버튼 표시 */}
          {isLoggedIn ? (
            <>
              <button
                className="login-btn"
                onClick={() => navigate("/profile")}
              >
                내 프로필
              </button>
              <button
                className="login-btn"
                style={{ backgroundColor: "transparent", color: "#ff6600" }}
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <button
              className="login-btn"
              onClick={() => navigate("/login")}
            >
              로그인
            </button>
          )}
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </>
  );
}
