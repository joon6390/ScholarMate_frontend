import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/userinfor.css";
import regions from "../data/regions";  
import majorFields from "../data/majorFields";  
import universities from "../data/universities";
import universitiesWithDepartments from "../data/universities_with_departments";

const incomeLevels = Array.from({ length: 10 }, (_, i) => `${i + 1}분위`);
const academicYears = ["1학년", "2학년", "3학년", "4학년", "5학년 이상"]; 
const semesters = ["신입생", "1학기", "2학기", "3학기", "4학기", "5학기", "6학기", "7학기", "8학기 이상"]; 
const genders = ["남성", "여성", "선택안함"];
const univCategories = ["4년제(5-6년제포함)", "전문대(2-3년제)", "해외대학"];

const Userinfor = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedIncomeLevel, setSelectedIncomeLevel] = useState("");
  const [selectedMajorField, setSelectedMajorField] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState(""); 
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredUniversities, setFilteredUniversities] = useState(universities); 
  const [departments, setDepartments] = useState([]); 
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(""); 
  const [selectedSemester, setSelectedSemester] = useState(""); 
  const [selectedGender, setSelectedGender] = useState(""); 
  const [selectedUnivCategory, setSelectedUnivCategory] = useState(""); 
  const [name, setName] = useState("");  
  const [birthDate, setBirthDate] = useState("");  
  const [gpaLast, setGpaLast] = useState("");  
  const [gpaTotal, setGpaTotal] = useState("");  
  const [additionalInfo, setAdditionalInfo] = useState("");  
  const [multiCultureFamily, setMultiCultureFamily] = useState(false);
  const [singleParentFamily, setSingleParentFamily] = useState(false);
  const [multipleChildrenFamily, setMultipleChildrenFamily] = useState(false);
  const [nationalMerit, setNationalMerit] = useState(false);

  
  // 검색어 입력 시 universities.js에서 필터링
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      setFilteredUniversities(
        universities.filter((uni) =>
          uni.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredUniversities(universities);
    }
  };

  // 대학 선택 시 학과 목록 업데이트
  const handleSelectUniversity = (university) => {
    setSelectedUniversity(university);
    setIsModalOpen(false);
    setSearchQuery(""); // 검색어 초기화

    // 선택된 대학교의 학과 리스트 불러오기
    if (universitiesWithDepartments[university]) {
      setDepartments(universitiesWithDepartments[university]);
    } else {
      setDepartments([]); // 학과 정보가 없을 경우 빈 배열 유지
    }
  };

  // ✅ Django 백엔드로 데이터 저장 요청
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    
    const userInfo = {
      name,
      gender: selectedGender || null,
      birth_date: birthDate ? new Date(birthDate).toISOString().split("T")[0] : null,
      region: selectedRegion || null,
      district: selectedDistrict || null,
      income_level: selectedIncomeLevel || null,
      university_category: selectedUnivCategory || null,
      university: selectedUniversity || null,
      department: selectedDepartment || null,
      academic_year: selectedAcademicYear || null,
      semester: selectedSemester || null,
      gpa_last: gpaLast ? parseFloat(gpaLast) : null,
      gpa_total: gpaTotal ? parseFloat(gpaTotal) : null,
      multi_culture_family: !!multiCultureFamily,
      single_parent_family: !!singleParentFamily,
      multiple_children_family: !!multipleChildrenFamily,
      national_merit: !!nationalMerit,
      additional_info: additionalInfo || null,
    };

    console.log("🚀 Sending Data:", userInfo);  // 🚀 Django로 보낼 데이터 확인

    try {
      const response = await fetch("http://127.0.0.1:8000/userinfor/scholarship/save/", {
        method: "POST",
        headers: {
          "Authorization": `JWT ${token}`,  // ✅ 사용자 인증 추가
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const result = await response.json();
      console.log("📌 Django Response:", result);  // 📌 Django 응답 확인

      if (response.ok) {
        alert("장학 정보가 저장되었습니다.");
      } else {
        alert("저장 실패");
      }
    } catch (error) {
      console.error("🚨 서버 오류 발생:", error);
      alert("서버 오류 발생");
    }
  };

  return (
    <div className="container">
      <div className="profile-box">
        <h2 className="title">장학 정보 입력</h2>

        <div className="form-row">
          <label className="form-label">이름</label>
          <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름 입력" />
        </div>

        <div className="form-row">
          <label className="form-label">성별</label>
          <select
            className="form-select"
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <option value="">성별 선택</option>
            {genders.map((gender, index) => (
              <option key={index} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label className="form-label">생년월일</label>
          <input type="date" className="form-input"value={birthDate} onChange={(e) => setBirthDate(e.target.value)} min="1900-01-01" max="2100-12-31" />
        </div>

        <div className="form-row">
          <label className="form-label">거주 지역</label>
          <div className="form-group">
            <select className="form-select" value={selectedRegion} onChange={(e) => { setSelectedRegion(e.target.value); setSelectedDistrict(""); }}>
              <option value="">지역 선택</option>
              {Object.keys(regions).map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            <select className="form-select" value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} disabled={!selectedRegion}>
              <option value="">군/구 선택</option>
              {selectedRegion && regions[selectedRegion].map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">소득 분위</label>
          <select 
            className="form-select"
            value={selectedIncomeLevel}
            onChange={(e) => setSelectedIncomeLevel(e.target.value)}
          >
            <option value="">분위 선택</option>
            {incomeLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

         <div className="form-row">
          <label className="form-label">대학 유형</label>
          <select
            className="form-select"
            value={selectedUnivCategory}
            onChange={(e) => setSelectedUnivCategory(e.target.value)}
          >
            <option value="">대학 유형 선택</option>
            {univCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label className="form-label">지원 계열</label>
          <select 
            className="form-select"
            value={selectedMajorField}
            onChange={(e) => setSelectedMajorField(e.target.value)}
          >
            <option value="">계열 선택</option>
            {majorFields.map((field) => (
              <option key={field} value={field}>{field}</option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label className="form-label">학교</label>
          <div className="form-group">
            <input 
              type="text" 
              className="form-input"
               placeholder="대학교 선택" 
               value={selectedUniversity}
               readOnly
            />
            <button className="form-button" onClick={() => setIsModalOpen(true)}>
              검색
            </button>
          </div>
        </div>

         {/* 대학교 검색 모달 창 */}
         {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>대학교 검색</h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                닫기
              </button>

              <input
                type="text"
                className="search-input"
                placeholder="대학교 검색"
                value={searchQuery}
                onChange={handleSearch}
              />
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                닫기
              </button>
              <ul className="dropdown-list">
                {filteredUniversities.length > 0 ? (
                  filteredUniversities.map((uni) => (
                    <li key={uni} onClick={() => handleSelectUniversity(uni)}>
                      {uni}
                    </li>
                  ))
                ) : (
                  <li>검색 결과 없음</li>
                )}
              </ul>
            </div>
          </div>
        )}

        <div className="form-row">
          <label className="form-label">학과/학년</label>
          <div className="form-group">
            <select 
              className="form-select"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              disabled={!departments.length} // 학과가 없으면 비활성화
            >
              <option value="">학과 선택</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>

            <select className="form-select"
            value={selectedAcademicYear}
            onChange={(e) => setSelectedAcademicYear(e.target.value)}
            >
              <option value="">학년 선택</option>
              {academicYears.map((year, index) => (
                <option key={index} value={year}>{year}</option>
              ))}
              </select>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">수료 학기</label>
          <select 
            className="form-select"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option>학기 선택</option>
            {semesters.map((semester, index) => (
              <option key={index} value={semester}>
                {semester}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label className="form-label">성적</label>
          <div className="form-group">
            <input type="number" className="form-input" step="0.01" placeholder="직전 학기 성적" value={gpaLast} onChange={(e) => setGpaLast(e.target.value)}/>
            <input type="number" className="form-input" step="0.01" placeholder="전체 성적"  value={gpaTotal} onChange={(e) => setGpaTotal(e.target.value)} />
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">기타</label>
          <div className="checkbox-group">
            <label><input type="checkbox" checked={multiCultureFamily} onChange={() => setMultiCultureFamily(!multiCultureFamily)} /> 다문화 가정</label>
            <label><input type="checkbox" checked={singleParentFamily} onChange={() => setSingleParentFamily(!singleParentFamily)} /> 한부모 가정</label>
            <label><input type="checkbox" checked={multipleChildrenFamily} onChange={() => setMultipleChildrenFamily(!multipleChildrenFamily)} /> 다자녀 가정</label>
            <label><input type="checkbox" checked={nationalMerit} onChange={() => setNationalMerit(!nationalMerit)} /> 국가유공자</label>
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">추가 정보</label>
          <textarea className="form-textarea" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} placeholder="예시) 프랜차이즈 카페에서 주 7시간 근무 중. 소득 분위 관련 장학금을 찾고 있음." />
        </div>

        <div className="form-row">
          <button className="save-btn" onClick={handleSave}>저장하기</button>
        </div>
      </div>
    </div>
  );
};

export default Userinfor;
