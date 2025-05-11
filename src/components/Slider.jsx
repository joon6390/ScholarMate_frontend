import sliderImage from "../assets/img/메인.jpg";
import "../assets/css/Slider.css";

export default function Slider() {
  return (
    <section className="slider__wrap">
      <div className="slider">
        <div
          className="slider__img"
          style={{
            backgroundImage: `url(${sliderImage})`,
          }}
        >
          <div className="desc text-white text-center">
            <h3 className="text-4xl md:text-6xl font-bold mb-4">ScholarMate</h3>
            <p className="text-lg md:text-xl mb-6">
              당신에게 맞는 장학금을 찾아보세요! <br />
              ScholarMate는 AI를 활용하여 당신에게 가장 적합한 장학금을 찾아드립니다.
            </p>
            <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
              자세히 알아보기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
