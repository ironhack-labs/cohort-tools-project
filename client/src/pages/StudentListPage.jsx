import { useState, useEffect } from "react";
import axios from "axios";

import StudentCard from "../components/StudentCard";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL;

function StudentListPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/students?$`)
      .then((response) => {
        setStudents(response.data)})
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="StudentListPage">
      {students && students.map((student) => (
          <StudentCard key={student._id} {...student} />
      ))}
    </div>
  );
}

export default StudentListPage;
