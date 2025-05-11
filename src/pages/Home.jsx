import "../assets/css/Home.css";
import Slider from "../components/Slider"; 
import Footer from "../components/Footer"; 
import CommunityNotice from "../components/CommunityNotice";
import CardSection from "../components/CardSection";
import ImgText from "../components/ImgText";
import ImageType from "../components/ImageType";
import TextType from '../components/TextType';

export default function Home() {
  return (
    <div className="home-container pb-0">
      <Slider />
      <CommunityNotice />
      <CardSection />
      <ImageType /> 
      <ImgText />
      <TextType />
      <Footer />
    </div>
  );
}
