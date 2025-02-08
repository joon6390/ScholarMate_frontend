import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/myinfor.css";

const UserProfile = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    alert("프로필 정보가 저장되었습니다.");
  };

  return (
    <div className="container">
      <div className="profile-box">
        <h2 className="title">장학 정보 입력</h2>

        <div className="form-row">
          <label className="form-label">이름</label>
          <input type="text" className="form-input" placeholder="김장학" />
        </div>

        <div className="form-row">
          <label className="form-label">생년월일</label>
          <input type="date" className="form-input" min="1900-01-01" max="2100-12-31"/>
        </div>

        <div className="form-row">
          <label className="form-label">이메일</label>
          <input type="email" className="form-input" placeholder="example@domain.com" />
        </div>

        <div className="form-row">
          <label className="form-label">닉네임</label>
          <input type="text" className="form-input" placeholder="내꿈은휴학" />
        </div>

        <div className="form-row">
          <label className="form-label">거주 지역</label>
          <div className="form-group">
            <select className="form-select">
              <option>지역</option>
            </select>
            <select className="form-select">
              <option>군/구</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">소득 분위</label>
          <select className="form-select">
            <option>분위 선택</option>
          </select>
        </div>

        <div className="form-row">
          <label className="form-label">지원 계열</label>
          <select className="form-select">
            <option>계열 선택</option>
          </select>
        </div>

        <div className="form-row">
          <label className="form-label">학교</label>
          <div className="form-group">
            <input type="text" className="form-input" placeholder="대학교 선택" />
            <button className="form-button">검색</button>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">학과/학년</label>
          <div className="form-group">
            <select className="form-select">
              <option>학과 선택</option>
            </select>
            <select className="form-select">
              <option>학년 선택</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">수료 학기</label>
          <select className="form-select">
            <option>학기 선택</option>
          </select>
        </div>

        <div className="form-row">
          <label className="form-label">성적</label>
          <div className="form-group">
            <input type="number" className="form-input" step="0.01" placeholder="직전 학기 성적" />
            <input type="number" className="form-input" step="0.01" placeholder="전체 성적" />
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">기타</label>
          <div className="checkbox-group">
            <label><input type="checkbox" /> 다문화 가정</label>
            <label><input type="checkbox" /> 한부모 가정</label>
            <label><input type="checkbox" /> 다자녀 가정</label>
            <label><input type="checkbox" /> 국가유공자</label>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">추가 정보</label>
          <textarea className="form-textarea" placeholder="예시) 프랜차이즈 카페에서 주 7시간 근무 중. 소득 분위 관련 장학금을 찾고 있음." />
        </div>

        <div className="form-row">
          <button className="save-btn" onClick={handleSave}>저장하기</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
