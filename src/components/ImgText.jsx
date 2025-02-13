import React from "react";
import "../assets/css/ImgText.css"; // ✅ CSS 파일 연결
import img1 from "../assets/img/한국.png"; // ✅ 이미지 import
import img2 from "../assets/img/드림스폰.jpg"; // ✅ 이미지 import

const ImgText = () => {
  return (
    <section id="imTextType" className="imgText__wrap section nexon">
      <h2 className="blind">이미지 텍스트 유형</h2>
      <div className="imgText__inner container">
        <div className="imgText__txt">
          <h3 className="title">유용한 사이트 살펴보기</h3>
          <p className="desc">
            방대한 장학금 정보 속에서 여러분들의 원활한 장학금 신청을 <br /> 위한 
            유용한 사이트입니다.
          </p>

          <ul className="list">
            <li><a href="/">한국장학재단</a></li>
            <li><a href="/">드림스폰</a></li>
          </ul>
        </div>
        <div className="imgText__img img1" style={{ backgroundImage: `url(${img1})` }}>
          <a href="/">한국장학재단 바로가기</a>
        </div>
        <div className="imgText__img img2" style={{ backgroundImage: `url(${img2})` }}>
          <a href="/" className="blue">드림스폰 바로가기</a>
        </div>
      </div>
    </section>
  );
};

export default ImgText;
