import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/css/Auth.css";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/jwt/create/",
        form
      );
      // JWT 토큰 저장
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      // 로그인 상태 업데이트 (부모 컴포넌트에 알림)
      onLogin();

      // 프로필 페이지로 이동
      navigate("/profile");
    } catch (error) {
      setErrorMessage("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>로그인</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="아이디"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn">로그인</button>
        </form>
        <button
          className="link-btn"
          onClick={() => navigate("/register")}
          style={{ marginTop: "20px" }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}