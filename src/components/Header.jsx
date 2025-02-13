import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png"; 

export default function Header({ isLoggedIn, handleLogout }) {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          <img src={logo} alt="ScholarMate Logo" />
          <h1>ScholarMate</h1>
        </Link>
      </div>
      <nav className="nav">
        <Link to="/scholarships">전체 장학금</Link>
        <Link to="/recommendations">추천 장학금</Link>
        <Link to="/community">관심 장학금</Link>
        <Link to="/calendar">개인 장학 캘린더</Link>
        <Link to="/Userinfor">개인 장학 정보</Link>
      </nav>
      <div className="header-right">
        {isLoggedIn ? (
          <>
            <button onClick={() => window.location.href = "/profile"}>마이페이지</button>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <button onClick={() => window.location.href = "/login"}>로그인</button>
        )}
      </div>
    </header>
  );
}
