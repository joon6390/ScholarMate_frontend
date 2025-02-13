import React from "react";
import "../assets/css/image.css"; // CSS 파일 적용
import image1 from "../assets/img/image_bg01.jpg";
import image2 from "../assets/img/image_bg02.jpg";

const ImageSection = () => {
  return (
    <section id="imageType" className="image__wrap nexon section">
      <h2>나의 맞춤 장학금을 만나다</h2>
      <p>개인 장학 정보 입력 후 가장 적합한 장학금을 만나보실 수 있습니다.</p>
    </section>
  );
};

export default ImageSection;
