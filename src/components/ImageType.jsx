import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/ImageType.css"; 
import imgBg1 from "../assets/img/관심.jpg"; // 이미지 import 추가
import imgBg2 from "../assets/img/달력.jpg"; // 이미지 import 추가

const ImageCard = ({ title, description, imgSrc, link }) => {
    return (
      <article className="image" style={{ 
        backgroundImage: `url(${imgSrc})`, 
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        <div className="image__overlay"></div> {/* 어두운 배경 추가 */}
        <div className="image__content">
          <h3 className="image__title">{title}</h3>
          <p className="image__desc">{description}</p>
          <Link className="image__btn" to={link}>
            바로가기
          </Link>
        </div>
      </article>
    );
  };
  
  const ImageType = () => {
    return (
      <section id="imageType" className="image__wrap nexon section">
        <h2>나의 관심 장학금을 관리하다</h2>
        <p>관심있는 장학금에 하트를 눌러 관심 장학금과 나의 장학 캘린더에서 관심 장학금을 관리해보세요.</p>
        <div className="image__inner container">
          <ImageCard
            title="관심 장학금"
            description="전체 장학금 목록에서 관심있는 장학금을 조회하여 하트를 누르거나 추천받은 맞춤형 장학금에 하트를 눌러 여러분의 관심 장학금을 한번에 확인하고 관리해보세요."
            imgSrc={imgBg1}
            link="/interest"
          />
          <ImageCard
            title="나의 장학 캘린더"
            description="관심 장학금의 신청 마감일, 필요한 제출 서류 등을 한 번에 확인하고, 마감일이 다가올 때 알림을 통해 중요한 일정을 놓치지 않도록 관리해보세요."
            imgSrc={imgBg2}
            link="/calendar"
          />
        </div>
      </section>
    );
  };
  
  export default ImageType;
