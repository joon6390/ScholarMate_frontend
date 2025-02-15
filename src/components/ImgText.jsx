import React from "react";
import "../assets/css/ImgText.css";
import img1 from "../assets/img/한국.png";
import img2 from "../assets/img/드림스폰.jpg";

const ImgText = () => {
  return (
    <section id="imTextType" className="imgText__wrap section nexon">
      <div className="imgText__inner container">
        <div className="imgText__txt">
          <h3 className="title">유용한 사이트 살펴보기</h3>
          <p className="desc">
            방대한 장학금 정보 속에서 여러분들의 원활한 장학금 신청을 <br />
            위한 유용한 사이트입니다.
          </p>

          <ul className="list">
            <li><a href="https://www.kosaf.go.kr/" target="_blank" rel="noopener noreferrer">한국장학재단</a></li>
            <li><a href="https://www.dreamspon.com/" target="_blank" rel="noopener noreferrer">드림스폰</a></li>
          </ul>
        </div>
        <div className="imgText__img img1" style={{ backgroundImage: `url(${img1})` }}>
          <a href="https://www.kosaf.go.kr/" target="_blank" rel="noopener noreferrer">한국장학재단 바로가기</a>
        </div>
        <div className="imgText__img img2" style={{ backgroundImage: `url(${img2})` }}>
          <a href="https://www.dreamspon.com/" target="_blank" rel="noopener noreferrer" className="blue">
            드림스폰 바로가기
          </a>
        </div>
      </div>
    </section>
  );
};

export default ImgText;
