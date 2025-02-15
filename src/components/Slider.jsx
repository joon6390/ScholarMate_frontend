import "../assets/css/Slider.css"; 
import sliderImage from "../assets/img/메인.jpg"; 

export default function Slider() {
  return (
    <section id="sliderType" className="slider__wrap nexon">
      <div className="slider__inner">
        <div className="slider">
          {/* 배경 이미지 */}
          <div className="slider__img" style={{ backgroundImage: `url(${sliderImage})` }}>
            <div className="desc">
              <h3>ScholarMate</h3>
              <p>
                당신에게 맞는 장학금을 찾아보세요!  <br />
                ScholarMate는 AI를 활용하여 당신에게 가장 적합한 장학금을 찾아드립니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
