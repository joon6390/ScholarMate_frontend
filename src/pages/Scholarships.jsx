import { useEffect, useState } from "react";
import { getScholarships } from "../api/scholarships";

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    getScholarships().then(setScholarships);
  }, []);

  return (
    <div>
      <h1>장학금 목록</h1>
      <ul>
        {scholarships.map((scholarship) => (
          <li key={scholarship.id}>
            <h3>{scholarship.name}</h3>
            <p>{scholarship.description}</p>
            <p>지원 금액: {scholarship.amount}</p>
            <p>마감일: {scholarship.deadline}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
