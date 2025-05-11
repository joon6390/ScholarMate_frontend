import { useState } from "react";
import axios from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../assets/css/Auth.css";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // 🔁 이전에 보호된 페이지에서 왔다면 경로 기억
  const from = location.state?.from || "/";

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

      const access = response.data.access;
      const refresh = response.data.refresh;

      // ✅ 토큰 저장
      localStorage.setItem("token", access);
      localStorage.setItem("refreshToken", refresh);

      // ✅ axios 헤더에 access token 적용
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      // ✅ 로그인 상태 상위에 알림
      onLogin();

      // ✅ 원래 가려던 페이지로 이동
      navigate(from, { replace: true });
    } catch (error) {
      setErrorMessage("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>로그인</h2>
        {location.state?.from && (
          <p className="error-message">로그인 후 이용 가능합니다.</p>
        )}
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
