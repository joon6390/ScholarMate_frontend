import { useState, useEffect } from "react"; // ✅ useState 및 useEffect import
import { Route, Routes, Navigate, Link, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Scholarships from "./pages/Scholarships";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import logo from "./assets/img/logo.png"; // ✅ 로고 import

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ 로그인 상태 관리
  const navigate = useNavigate(); // ✅ useNavigate 추가
  const location = useLocation(); // ✅ 현재 경로 가져오기

  // ✅ 로그인 상태 확인 (페이지가 변경될 때마다 실행)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // ✅ 토큰이 있으면 true, 없으면 false
  }, [location.pathname]); // ✅ 경로가 변경될 때마다 로그인 상태 확인

  const handleLogin = () => {
    localStorage.setItem("token", "mockToken"); // ✅ 실제 JWT 토큰 저장 필요
    setIsLoggedIn(true);
    navigate("/"); // ✅ 로그인 후 홈으로 이동
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ 토큰 삭제
    setIsLoggedIn(false);
    navigate("/"); // ✅ 로그아웃 후 홈으로 이동
  };

  return (
    <>
      {/* ✅ 공통 헤더 */}
      <header className="header">
        <div className="header-left">
          {/* ✅ 로고 클릭 시 항상 홈페이지로 이동 */}
          <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}>
            <img src={logo} alt="Logo" className="logo" />
            <h1>ScholarMate</h1>
          </Link>
        </div>

        {/* ✅ 네비게이션 바 */}
        <nav className="nav">
          <Link to="/scholarships" className="nav-btn">전체 장학금</Link>
          <Link to="/recommendations" className="nav-btn">추천 장학금</Link>
          <Link to="/community" className="nav-btn">관심 장학금</Link>
          <Link to="/calendar" className="nav-btn">캘린더</Link>
          <Link to="/support" className="nav-btn">마이페이지</Link>
        </nav>

        {/* ✅ 로그인 / 로그아웃 버튼 */}
        <div className="header-right">
          {isLoggedIn ? (
            <>
              <button className="login-btn" onClick={() => navigate("/profile")}>내 프로필</button>
              <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
            </>
          ) : (
            <button className="login-btn" onClick={() => navigate("/login")}>로그인</button>
          )}
        </div>
      </header>

      {/* ✅ 페이지 내용 */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
          <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
        </Routes>
      </main>
    </>
  );
}
