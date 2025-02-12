import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/profile.css";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [scholarshipData, setScholarshipData] = useState(null);
  const [error, setError] = useState("");

  // Axios 인스턴스 생성
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
      Authorization: `JWT ${localStorage.getItem("token")}`,
    },
  });

  // 토큰 갱신 함수
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/jwt/refresh/", {
        refresh: localStorage.getItem("refreshToken"),
      });
      localStorage.setItem("token", response.data.access);
      api.defaults.headers.Authorization = `JWT ${response.data.access}`;
    } catch (err) {
      console.error("토큰 갱신 실패:", err);
      setError("로그인이 필요합니다.");
    }
  };

  // 회원 기본 정보 가져오기
  const fetchUserData = async () => {
    try {
      const response = await api.get("/auth/users/me/");
      setUserData(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        await refreshAccessToken();
        fetchUserData(); // 재시도
      } else {
        console.error("사용자 정보를 불러오지 못했습니다:", err);
        setError("사용자 정보를 불러오지 못했습니다.");
      }
    }
  };

  // 사용자 장학 정보 가져오기
  const fetchScholarshipData = async () => {
    try {
      const response = await api.get("/userinfor/scholarship/get/");
      setScholarshipData(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        await refreshAccessToken();
        fetchScholarshipData(); // 재시도
      } else if (err.response?.status === 404) {
        setScholarshipData(null); // 장학 정보가 없을 경우 처리
      } else {
        console.error("장학 정보를 불러오지 못했습니다:", err);
        setError("장학 정보를 불러오지 못했습니다.");
      }
    }
  };

  // 페이지 로딩 시 데이터 가져오기
  useEffect(() => {
    fetchUserData();
    fetchScholarshipData();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!userData) {
    return <p>사용자 정보를 불러오는 중...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div>
          <h2>{userData.username}님의 마이페이지</h2>
        </div>
      </div>

      {/* ✅ 회원 정보 */}
      <div className="profile-card">
        <h3>회원 정보</h3>
        <p><strong>아이디:</strong> {userData.username}</p>
        <p><strong>이메일:</strong> {userData.email}</p>
      </div>

      {/* ✅ 장학 정보 */}
      {scholarshipData ? (
        <div className="profile-card">
          <h3>장학 정보</h3>
          <p><strong>이름:</strong> {scholarshipData.name || "없음"}</p>
          <p><strong>성별:</strong> {scholarshipData.gender || "없음"}</p>
          <p><strong>출생일:</strong> {scholarshipData.birth_date || "없음"}</p>
          <p><strong>거주 지역:</strong> {scholarshipData.region || "없음"}, {scholarshipData.district || "없음"}</p>
          <p><strong>소득 분위:</strong> {scholarshipData.income_level || "없음"}</p>
          <p><strong>대학:</strong> {scholarshipData.university || "없음"}</p>
          <p><strong>학과:</strong> {scholarshipData.department || "없음"}</p>
          <p><strong>학년:</strong> {scholarshipData.academic_year || "없음"}</p>
          <p><strong>수료 학기:</strong> {scholarshipData.semester || "없음"}</p>
          <p><strong>최근 학기 성적:</strong> {scholarshipData.gpa_last || "없음"}</p>
          <p><strong>전체 성적:</strong> {scholarshipData.gpa_total || "없음"}</p>

          <h3>기타 정보</h3>
          <p><strong>다문화 가정:</strong> {scholarshipData.multi_culture_family ? "예" : "아니오"}</p>
          <p><strong>한부모 가정:</strong> {scholarshipData.single_parent_family ? "예" : "아니오"}</p>
          <p><strong>다자녀 가정:</strong> {scholarshipData.multiple_children_family ? "예" : "아니오"}</p>
          <p><strong>국가유공자:</strong> {scholarshipData.national_merit ? "예" : "아니오"}</p>

          <p><strong>추가 정보:</strong> {scholarshipData.additional_info || "없음"}</p>
        </div>
      ) : (
        <p className="error">장학 정보가 없습니다.</p>
      )}
    </div>
  );
}
