import axios from "axios";

// Django 백엔드 API URL
const BASE_URL = "http://localhost:8000/scholarships/api/scholarships";

export const getScholarships = async (page = 1, perPage = 10) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        page,     // 현재 페이지 번호
        perPage,  // 한 페이지당 표시할 데이터 개수
      },
    });
    return response.data; // 데이터 반환
  } catch (error) {
    console.error("Failed to fetch scholarships:", error);
    throw error;
  }
};
