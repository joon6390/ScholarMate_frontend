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

  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scholarshipTypeMapping = {
    regional: "지역연고",
    academic: "성적우수",
    income_based: "소득구분",
    special_talent: "특기자",
    other: "기타",
  };

  const buildApiUrl = () => {
    const typeParam = scholarshipTypeMapping[selectedType] || "";
    return `http://localhost:8000/scholarships/api/scholarships/?page=${page}&perPage=${perPage}&search=${searchQuery}&type=${typeParam}&sort=${sortOrder}`;
  };

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

  const fetchFavorites = async () => {
    try {
      const res = await fetch("http://localhost:8000/scholarships/api/wishlist/", {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        const ids = data.map((item) => `${item.scholarship.name}_${item.scholarship.foundation_name}`);
        setFavorites(new Set(ids));
      }
    } catch (err) {
      console.log("찜 불러오기 실패", err);
    }
  };

  useEffect(() => {
  // 페이지 진입 시 body에 클래스 부여
  document.body.classList.add("scholarships-page");
  fetchScholarships();
  fetchFavorites();

  // 페이지 벗어날 때 클래스 제거
  return () => {
    document.body.classList.remove("scholarships-page");
  };
}, [page, selectedType, sortOrder]);

  const openModal = (scholarship) => {
    setSelectedScholarship(scholarship);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedScholarship(null);
    setIsModalOpen(false);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setPage(1);
  };

  const handleSearch = () => {
    setPage(1);
    fetchScholarships();
  };

  const handleFavoriteToggle = async (item) => {
    const id = `${item["상품명"]}_${item["운영기관명"]}`;
    const isFavorited = favorites.has(id);
  
    const url = isFavorited
      ? "http://localhost:8000/scholarships/api/wishlist/toggle/"
      : "http://localhost:8000/scholarships/api/wishlist/add-from-api/";
  
    const method = "POST";
  
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(
          isFavorited
            ? { product_id: id, action: "remove" } // 삭제용 토글 요청
            : item
        ),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setFavorites((prev) => {
          const updated = new Set(prev);
          if (isFavorited) {
            updated.delete(id);
          } else {
            updated.add(id);
          }
          return updated;
        });
  
        alert(isFavorited ? "관심 장학금에서 삭제되었습니다." : "관심 장학금에 추가되었습니다.");
      } else {
        alert(result?.error || "서버 오류");
      }
    } catch (err) {
      alert("찜 처리 중 오류 발생");
    }
  };  

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <div className="scholarships-container">
      <div className="scholarships-wrapper">
        <div className="search-and-filter">
          <input
            type="text"
            placeholder="장학 사업명 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-btn">검색</button>

          <select value={selectedType} onChange={handleTypeChange} className="filter-dropdown">
            <option value="">모든 유형</option>
            <option value="regional">지역 연고</option>
            <option value="academic">성적 우수</option>
            <option value="income_based">소득 구분</option>
            <option value="special_talent">특기자</option>
            <option value="other">기타</option>
          </select>

          <select value={sortOrder} onChange={handleSortChange} className="sort-dropdown">
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
                  <th>상세정보</th>
                  <th>홈페이지</th>
                  <th>찜</th>
                </tr>
              </thead>
              <tbody>
                {scholarships.map((item) => (
                  <tr key={item.id}>
                    <td>{item["운영기관명"]}</td>
                    <td>{item["상품명"]}</td>
                    <td>{item["모집시작일"]} ~ {item["모집종료일"]}</td>
                    <td>
                      <button onClick={() => openModal(item)} className="details-btn">
                        상세정보 보기
                      </button>
                    </td>
                    <td>
                      <button onClick={() => window.open(item["홈페이지 주소"], "_blank")} className="details-btn">
                        홈페이지 보기
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleFavoriteToggle(item)}
                        className={`favorite-btn ${favorites.has(item.id) ? "favorited" : ""}`}
                      >
                        {favorites.has(item.id) ? "❤️" : "🤍"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                이전 페이지
              </button>
              <span>페이지 {page} / {totalPages}</span>
              <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
                다음 페이지
              </button>
            </div>
          </>
        )}
      
      </div>

      {isModalOpen && selectedScholarship && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedScholarship["상품명"]} 상세 정보</h2>
            <p><strong>성적기준:</strong> {selectedScholarship["성적기준 상세내용"]}</p>
            <p><strong>소득기준:</strong> {selectedScholarship["소득기준 상세내용"]}</p>
            <p><strong>지원내역:</strong> {selectedScholarship["지원내역 상세내용"]}</p>
            <p><strong>특정자격:</strong> {selectedScholarship["특정자격 상세내용"]}</p>
            <p><strong>지역거주여부:</strong> {selectedScholarship["지역거주여부 상세내용"]}</p>
            <p><strong>선발방법:</strong> {selectedScholarship["선발방법 상세내용"]}</p>
            <p><strong>선발인원:</strong> {selectedScholarship["선발인원 상세내용"]}</p>
            <p><strong>자격제한:</strong> {selectedScholarship["자격제한 상세내용"]}</p>
            <p><strong>추천필요여부:</strong> {selectedScholarship["추천필요여부 상세내용"]}</p>
            <p><strong>제출서류:</strong> {selectedScholarship["제출서류 상세내용"]}</p>
            <p><strong>홈페이지:</strong> <a href={selectedScholarship["홈페이지 주소"]} target="_blank" rel="noopener noreferrer">홈페이지 이동</a></p>
            <button onClick={closeModal} className="close-btn">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
