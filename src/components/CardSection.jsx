import React from "react";
import "../assets/css/Card.css";
import Card from "./Card";
import cardImg1 from "../assets/img/전체.jpg";
import cardImg2 from "../assets/img/개인.jpg";
import cardImg3 from "../assets/img/추천.jpg";

const CardSection = () => {
  const cardData = [
    {
      image: cardImg1,
      title: "전체 장학금",
      description: (
        <>
          통합된 장학금 데이터 목록을 <br /> 조회하세요.
        </>
      ),
      link: "/scholarships"
    },
    {
      image: cardImg2,
      title: "나의 장학 정보",
      description: (
        <>
          개인 맞춤형 장학금 추천을 위한 <br /> 정보를 입력하세요.
        </>
      ),
      link: "/Userinfor"
    },
    {
      image: cardImg3,
      title: "추천 장학금",
      description: (
        <>
          입력하신 정보를 바탕으로 <br /> 개인 맞춤형 장학금을 만나보세요.
        </>
      ),
      link: "/recommendations"
    }
  ];

  return (
    <section id="cardType" className="card__wrap nexon section">
      <h2>나의 맞춤형 장학금을 만나다</h2>
      <p>개인 장학 정보를 입력한 후 당신에게 가장 적합한 장학금을 추천받아보세요.</p>
      <div className="card__inner container">
        {cardData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </section>
  );
};

export default CardSection;
