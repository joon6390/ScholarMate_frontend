import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/Profile.css"; // 스타일 추가

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // 서버에서 사용자 정보 가져오기
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/auth/users/me/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // 토큰 인증
          },
        });
        setProfile(response.data); // 사용자 데이터 설정
        setLoading(false); // 로딩 완료
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError("인증에 실패했습니다. 다시 로그인해주세요.");
        } else {
          setError("프로필 정보를 가져오는데 실패했습니다.");
        }
        setLoading(false);
      }
    };

    fetchProfile(); // 컴포넌트 로드 시 사용자 정보 요청
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="profile-container">
      <h2>내 프로필</h2>
      <div className="profile-card">
        <p><strong>아이디:</strong> {profile.username}</p>
        <p><strong>이름:</strong> {profile.first_name} {profile.last_name}</p>
        <p><strong>닉네임:</strong> {profile.nickname}</p>
        <p><strong>생년월일:</strong> {profile.birth_date}</p>
        <p><strong>이메일:</strong> {profile.email}</p>
      </div>
    </div>
  );
}
