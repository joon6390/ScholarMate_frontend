import "../assets/css/Home.css";
import Slider from "../components/Slider"; 
import Footer from "../components/Footer"; 
import CommunityNotice from "../components/CommunityNotice";
import Banner from "../components/Banner";
import CardSection from "../components/CardSection";
import ImgText from "../components/ImgText";
import ImageType from "../components/ImageType";

export default function Home() {
  return (
    <div className="home-container" style={{ paddingBottom: "100px" }}>
      <Slider />
      <CommunityNotice />
      <CardSection />
      <ImageType /> 
      <ImgText />
      <Banner
        title="ScholarMate"
        description="ScholarMate는 장학금 지원 기회를 놓치는 문제를 해결하고, 더 많은 학생들에게 교육의 평등성을 제공하는 것을 목표로 합니다."
      />
      <Footer />
    </div>
  );
}
