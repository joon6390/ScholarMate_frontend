import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/css/Auth.css"; // 스타일 추가

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    nickname: "",
    birthDate: "",
    email: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (form.password !== form.confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!form.birthDate) {
      setErrorMessage("생년월일을 입력해주세요.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/auth/users/", {
        username: form.username,
        password: form.password,
        full_name: form.fullName,
        nickname: form.nickname,
        birth_date: form.birthDate,
        email: form.email
      });
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (error) {
      if (error.response?.data?.username) {
        setErrorMessage("이미 회원가입된 아이디입니다.");
      } else if (error.response?.data?.password) {
        setErrorMessage("비밀번호는 8자리 이상이어야 합니다.");
      } else if (error.response?.data?.email) {
        setErrorMessage("유효하지 않은 이메일 형식입니다.");
      } else {
        setErrorMessage("회원가입 실패: " + JSON.stringify(error.response?.data));
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>회원가입</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="아이디" onChange={handleChange} required />
          <input type="password" name="password" placeholder="비밀번호 (8자 이상)" onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="비밀번호 확인" onChange={handleChange} required />
          <input type="text" name="fullName" placeholder="이름" onChange={handleChange} required />
          <input type="text" name="nickname" placeholder="닉네임" onChange={handleChange} required />

          {/* 생년월일 입력 */}
          <div className="date-box">
            <span className="date-label">생년월일</span>
            <input
              type="date"
              name="birthDate"
              className="date-input"
              min="1900-01-01"
              max="2100-12-31"
              value={form.birthDate}
              onChange={handleChange}
              required
            />
          </div>

          <input type="email" name="email" placeholder="이메일 주소" onChange={handleChange} required />
          <button type="submit" className="btn">회원가입</button>
        </form>
        <p>이미 계정이 있으신가요? <button className="link-btn" onClick={() => navigate("/login")}>로그인</button></p>
      </div>
    </div>
  );
}
