import { useState, useEffect } from "react";
import axios from "axios";

import StudentCard from "../components/StudentCard";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL;

function StudentListPage() {
  const [students, setStudents] = useState([]);

  // useEffect(() => {
  //   axios.defaults.withCredentials = true;
  //   axios.defaults.headers.common["Access-Control-Allow-Headers"] =
  //     "Authorization";
  //   const accessToken = localStorage.getItem("authToken");
  //   const requestInterceptor = axios.interceptors.request.use((config) => {
  //     if (accessToken) {
  //       config.headers.Authorization = accessToken;
  //     }
  //     config;
  //   });
  //   return () => {
  //     axios.interceptors.request.eject(requestInterceptor);
  //     axios.defaults.withCredentials = false;
  //     delete axios.defaults.headers.common["Access-Control-Allow-Headers"];
  //   };
  // }, []);

  // useEffect(() => {
  //   const accessToken = localStorage.getItem("authToken");
  //   axios.interceptors.request.use((config) => {
  //     if (accessToken) {
  //       config.headers.Authorization = accessToken;
  //     }
  //     return config;
  //   });
  // }, []);

  useEffect(() => {
    axios.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/students?$`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="StudentListPage">
      <div className="flex justify-between items-center p-2 font-bold border-b">
        <span
          className="flex items-center justify-center"
          style={{ flexBasis: "20%" }}
        >
          Image
        </span>
        <span style={{ flexBasis: "20%" }}>Name</span>
        <span style={{ flexBasis: "20%" }}>Program</span>
        <span style={{ flexBasis: "20%" }}>Email</span>
        <span style={{ flexBasis: "20%" }}>Phone</span>
      </div>

      {students &&
        students.map((student, index) => (
          <StudentCard
            key={student._id}
            {...student}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
          />
        ))}
    </div>
  );
}

export default StudentListPage;
