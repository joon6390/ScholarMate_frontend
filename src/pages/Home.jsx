import "../assets/css/Home.css";
import Slider from "../components/Slider"; // 슬라이드 컴포넌트 추가
import ImageSection from "../components/ImageSection"; // 변환된 이미지 섹션 추가
import Footer from "../components/Footer"; // 푸터 컴포넌트 추가

export default function Home() {
  return (
    <div className="home-container" style={{ paddingBottom: "100px" }}>
      {/* 슬라이드 섹션 추가 */}
      <Slider />

      {/* 이미지 섹션 추가 */}
      <ImageSection />

      {/* 푸터 */}
      <Footer />
    </div>
  );
}
