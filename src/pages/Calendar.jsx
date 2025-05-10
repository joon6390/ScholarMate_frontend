import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "../api/axios"; // 우리가 만든 axios 인스턴스 사용
import "../assets/css/CalendarPage.css"; // 선택: 스타일링 따로 하면 더 깔끔

export default function CalendarPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
  axios.get("/scholarships/calendar/")
    .then((res) => setEvents(res.data))
    .catch((err) => console.error("캘린더 불러오기 실패", err));
}, []);

  const renderTileContent = ({ date }) => {
  const dateStr = date.toISOString().split("T")[0]; // 안전하게 날짜 비교
  const match = events.find((e) => e.deadline?.split("T")[0] === dateStr);

  return match ? (
    <div
      className="calendar-event"
      title={match.title} // 마우스 올리면 전체 장학금명 표시
    >
      {match.title}    {/* ✔ 전체 제목 렌더링 */}
    </div>
  ) : null;
};

  return (
    <div className="calendar-container">
      <h2>📅 나의 장학 캘린더</h2>
      <Calendar tileContent={renderTileContent} />
    </div>
  );
}
