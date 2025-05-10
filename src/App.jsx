import { useState, useEffect } from "react";
import { Route, Routes, Navigate, Link, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Scholarships from "./pages/Scholarships";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Useinfor from "./pages/Userinfor";
import PrivateRoute from "./components/PrivateRoute"; // 
import logo from "./assets/img/로고.png";  
import Wishlist from "./components/Wishlist";
import CalendarPage from "./pages/Calendar";

export function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch {
    return true; // 토큰 파싱 실패 시 만료된 걸로 간주
  }
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && isTokenExpired(token)) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(!!token);
    }
  }, [location.pathname]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}>
            <img src={logo} alt="Logo" className="logo" />
            <h1>ScholarMate</h1>
          </Link>
        </div>
        <nav className="nav">
          <Link to="/scholarships" className="nav-btn">전체 장학금</Link>
          <Link to="/recommendations" className="nav-btn">추천 장학금</Link>
          <Link to="/interest" className="nav-btn">관심 장학금</Link>
          <Link to="/calendar" className="nav-btn">나의 장학 캘린더</Link>
          <Link to="/Userinfor" className="nav-btn">나의 장학 정보</Link>
        </nav>
        <div className="header-right" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {/* 마이페이지 버튼 (로그인 상태일 때는 보이고, 로그아웃 상태일 때는 invisible 처리) */}
          {isLoggedIn ? (
            <button className="login-btn" onClick={() => navigate("/profile")}>마이페이지</button>
          ) : (
            <button className="login-btn" style={{ visibility: "hidden" }}>마이페이지</button>
          )}
          
          {/* 로그인/로그아웃 버튼 */}
          {isLoggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
          ) : (
            <button className="login-btn" onClick={() => navigate("/login")}>로그인</button>
          )}
        </div>

      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/scholarships"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Scholarships />
              </PrivateRoute>
            }
          />
          <Route
            path="/recommendations"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <div>추천 장학금 페이지입니다.</div>
              </PrivateRoute>
            }
          />
          <Route
            path="/interest"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Wishlist />
              </PrivateRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <CalendarPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/Userinfor"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Useinfor />
              </PrivateRoute>
            }
          />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
          <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
        </Routes>
      </main>
    </>
  );
}