import "../assets/css/Home.css"; 
import bannerImage from "../assets/img/banner.png"; 

export default function Home() {
  return (
    <div className="home-container" style={{ paddingBottom: "100px" }}>
      {/* 메인 배너 섹션 */}
      <section className="banner">
        <div className="banner-content">
          <h2>당신에게 맞는 장학금을 찾아보세요!</h2>
          <p>
            ScholarMate는 AI를 활용하여 <br />
            당신에게 가장 적합한 장학금을 찾아드립니다.
          </p>
        </div>
        {/* 배경 이미지 */}
        <div className="banner-image">
          <img src={bannerImage} alt="Banner" />
        </div>
      </section>

      {/* 푸터 */}
      <footer className="footer">
        <p>© 2025 ScholarMate. All rights reserved.</p>
      </footer>
    </div>
  );
}
