import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
        <Link to={`/students/details/${student._id}`} key={student._id}>
          <StudentCard {...student} />
        </Link>
      ))}
    </div>
  );
}

export default StudentListPage;
