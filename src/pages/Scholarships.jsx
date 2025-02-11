import { useEffect, useState } from "react";
import "../assets/css/scholarships.css";

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [favorites, setFavorites] = useState(new Set());

  // ✅ Django 백엔드에서 사용하는 학자금 유형과 매핑
  const scholarshipTypeMapping = {
    regional: "지역연고",
    academic: "성적우수",
    income_based: "소득구분",
    special_talent: "특기자",
    other: "기타",
  };

  // ✅ API URL을 생성하는 함수
  const buildApiUrl = () => {
    const typeParam = scholarshipTypeMapping[selectedType] || "";
    return `http://localhost:8000/scholarships/api/scholarships/?page=${page}&perPage=${perPage}&search=${searchQuery}&type=${typeParam}&sort=${sortOrder}`;
  };

  // ✅ API 요청 함수
  const fetchScholarships = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(buildApiUrl());
      const result = await response.json();

      if (result) {
        const dataWithIds = result.data.map((item) => ({
          ...item,
          id: `${item["상품명"]}_${item["운영기관명"]}`,
        }));

        setScholarships(dataWithIds || []);
        setTotalCount(result.total || 0);
      } else {
        setScholarships([]);
        setTotalCount(0);
      }
    } catch (err) {
      setError("데이터를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ 페이지, 정렬, 장학금 유형 변경 시 자동으로 데이터 새로 불러오기
  useEffect(() => {
    fetchScholarships();
  }, [page, selectedType, sortOrder]);

  // ✅ 장학금 유형 변경 시 1페이지로 초기화
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setPage(1); // 🔥 1페이지로 초기화
  };

  // ✅ 정렬 방식 변경 시 1페이지로 초기화
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setPage(1); // 🔥 1페이지로 초기화
  };

  // ✅ 검색 버튼 클릭 시 API 요청
  const handleSearch = () => {
    setPage(1);
    fetchScholarships();
  };

  const handleFavoriteToggle = (id) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = new Set(prevFavorites);
      if (updatedFavorites.has(id)) {
        updatedFavorites.delete(id);
      } else {
        updatedFavorites.add(id);
      }
      return updatedFavorites;
    });
  };

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <div className="scholarships-container">
      <h1>장학금 목록</h1>

      {/* 검색창 및 필터 */}
      <div className="search-and-filter">
        <input
          type="text"
          placeholder="장학 사업명 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-btn">
          검색
        </button>

        {/* 장학금 유형 선택 */}
        <select
          value={selectedType}
          onChange={handleTypeChange} // ✅ 유형 변경 시 1페이지로 초기화
          className="filter-dropdown"
        >
          <option value="">모든 유형</option>
          <option value="regional">지역 연고</option>
          <option value="academic">성적 우수</option>
          <option value="income_based">소득 구분</option>
          <option value="special_talent">특기자</option>
          <option value="other">기타</option>
        </select>

        {/* 장학금 정렬 */}
        <select
          value={sortOrder}
          onChange={handleSortChange} // ✅ 정렬 변경 시 1페이지로 초기화
          className="sort-dropdown"
        >
          <option value="">정렬 없음</option>
          <option value="end_date">모집 종료일 순</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">로딩 중...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : scholarships.length === 0 ? (
        <div className="no-results">검색 결과가 없습니다.</div>
      ) : (
        <>
          <table className="scholarships-table">
            <thead>
              <tr>
                <th>장학 재단명</th>
                <th>장학 사업명</th>
                <th>기간</th>
                <th>정보</th>
                <th>찜</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map((item) => (
                <tr key={item.id}>
                  <td>{item["운영기관명"]}</td>
                  <td>{item["상품명"]}</td>
                  <td>
                    {item["모집시작일"]} ~ {item["모집종료일"]}
                  </td>
                  <td>
                    <a
                      href={item["홈페이지 주소"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="details-btn"
                    >
                      정보 보러가기
                    </a>
                  </td>
                  <td>
                    <button
                      onClick={() => handleFavoriteToggle(item.id)}
                      className={`favorite-btn ${
                        favorites.has(item.id) ? "favorited" : ""
                      }`}
                    >
                      {favorites.has(item.id) ? "❤️" : "🤍"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 페이지네이션 */}
          <div className="pagination">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              이전 페이지
            </button>
            <span>
              페이지 {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              다음 페이지
            </button>
          </div>
        </>
      )}
    </div>
  );
}
