import React from "react";
import "../assets/css/TextType.css";

const textItems = [
    { class: "t1", title: "마감일 체크", desc: "장학금 신청 마감일을 미리 확인하고 준비하세요.", link: "/" },
    { class: "t2", title: "서류 준비", desc: "성적 증명서, 추천서 등 필수 서류를 미리 준비하세요.", link: "/" },
    { class: "t3", title: "자기소개서 작성", desc: "자기소개서를 정성스럽게 작성하고 검토하세요.", link: "/" },
    { class: "t4", title: "추천서 요청", desc: "교수님이나 멘토에게 미리 추천서를 요청하세요.", link: "/" },
    { class: "t5", title: "장학금 검색", desc: "다양한 장학금을 검색하고 중복 지원을 고려하세요.", link: "/" },
    { class: "t6", title: "결과 확인 및 준비", desc: "결과 발표 후 추가 서류 제출을 준비하세요.", link: "/" }
];

const TextType = () => {
    return (
        <section id="textType" className="text__wrap nexon section">
            <h2 className="section__title">장학금 신청과 성공 방법</h2>
            <div className="text__inner">
                {textItems.map((item, index) => (
                    <div key={index} className={`text ${item.class}`}>
                        <h3 className="text__title">
                            <div className={`text__icon ${item.class}`}></div>
                            {item.title}
                        </h3>
                        <p className="text__desc">{item.desc}</p>
                        <a className="text__btn" href={item.link}>더보기</a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TextType;
