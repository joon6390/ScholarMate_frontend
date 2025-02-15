import React from "react";
import "../assets/css/Banner.css"; // 스타일 적용
import bannerBg from "../assets/img/배너.jpg"; // ✅ 이미지 import

const Banner = ({ title, description, link, linkText }) => {
    return (
      <section id="bannerType" className="banner__wrap nexon section" style={{ backgroundImage: `url(${bannerBg})` }}>
        <div className="banner__inner">
          <h3 className="title">{title}</h3>
          <p className="desc">
            {description}
          </p>
        </div>
      </section>
    );
  };
  
  export default Banner;
