export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 w-full">
      <div className="max-w-none px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-left">
          {/* 로고 및 설명 */}
          <div>
            <h2 className="text-xl font-bold mb-2">ScholarMate</h2>
            <p className="text-sm text-gray-300">
              혁신적인 비즈니스 솔루션을 제공하는 글로벌 기업입니다.
            </p>
          </div>

          {/* 서비스 */}
          <div>
            <h3 className="text-lg font-semibold mb-2">서비스</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>비즈니스 컨설팅</li>
              <li>디지털 마케팅</li>
              <li>IT 솔루션</li>
            </ul>
          </div>

          {/* 회사 소개 */}
          <div>
            <h3 className="text-lg font-semibold mb-2">회사 소개</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>회사 소개</li>
              <li>연혁</li>
              <li>채용 정보</li>
            </ul>
          </div>

          {/* 소셜 미디어 */}
          <div>
            <h3 className="text-lg font-semibold mb-2">소셜 미디어</h3>
            <div className="flex space-x-4 text-xl text-gray-400">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>

        {/* 하단 바 */}
        <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-4">
          © 2024 ScholarMate. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
