import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/profile.css";

export default function Profile() {
  const [userData, setUserData] = useState(null);
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

  // 사용자 데이터 가져오기
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

  useEffect(() => {
    fetchUserData();
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
        <div className="profile-actions">
        </div>
      </div>

      <div className="profile-card">
        <h3>회원가입 정보</h3>
        <p><strong>아이디:</strong> {userData.username}</p>
        <p><strong>이메일:</strong> {userData.email}</p>
      </div>
    </div>
  );
}
