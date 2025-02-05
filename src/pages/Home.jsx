import { Link } from "react-router-dom";
import "../assets/Home.css"; // CSS 파일 연결

export default function Home() {
  return (
    <div className="home-container">
      {/* 헤더 영역 */}
      <header className="header">
        <div className="header-left">
          <h1>ScholarMate</h1>
        </div>

        {/* 네비게이션 영역 (기능 버튼 5개) */}
        <nav className="nav">
          <Link to="/scholarships" className="nav-btn">장학금</Link>
          <Link to="/recommendations" className="nav-btn">추천</Link>
          <Link to="/community" className="nav-btn">커뮤니티</Link>
          <Link to="/calendar" className="nav-btn">캘린더</Link>
          <Link to="/support" className="nav-btn">고객센터</Link>
        </nav>

        {/* 로그인 버튼 */}
        <div className="header-right">
          <Link to="/login" className="login-btn">로그인</Link>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <section className="content">
        <h2>당신에게 맞는 장학금을 추천받으세요!</h2>
        <p>ScholarMate는 AI를 활용해 <br /> 당신에게 가장 적합한 장학금을 찾아드립니다.</p>
      </section>

      {/* 푸터 영역 */}
      <footer className="footer">
        <p>© 2025 ScholarMate. All rights reserved.</p>
      </footer>
    </div>
  );
}
