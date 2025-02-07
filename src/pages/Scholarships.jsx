import { useEffect, useState } from "react";
import "../assets/css/scholarships.css";

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState(""); // 장학금 유형
  const [sortOrder, setSortOrder] = useState(""); // 정렬 기준
  const [favorites, setFavorites] = useState(new Set()); // 찜 목록 (Set 사용)

  const fetchScholarships = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8000/scholarships/api/scholarships/?page=${page}&perPage=${perPage}&search=${searchQuery}&type=${selectedType}&sort=${sortOrder}`
      );
      const result = await response.json();

      if (result) {
        // 각 데이터에 고유 ID 생성 (상품명 + 운영기관명 조합)
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

  useEffect(() => {
    fetchScholarships();
  }, [page, selectedType, sortOrder]); // 유형, 정렬, 페이지 변경 시 호출

  const handleSearch = () => {
    setPage(1);
    fetchScholarships();
  };

  const handleFavoriteToggle = (id) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = new Set(prevFavorites);
      if (updatedFavorites.has(id)) {
        updatedFavorites.delete(id); // 이미 있으면 제거
      } else {
        updatedFavorites.add(id); // 없으면 추가
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

        {/* 장학금 유형 구분 */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">모든 유형</option>
          <option value="undergraduate">학부</option>
          <option value="graduate">대학원</option>
          <option value="international">해외</option>
        </select>

        {/* 장학금 정렬 */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="sort-dropdown"
        >
          <option value="">정렬 없음</option>
          <option value="end_date">모집 종료일 순</option>
          <option value="name">장학금 이름 순</option>
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
