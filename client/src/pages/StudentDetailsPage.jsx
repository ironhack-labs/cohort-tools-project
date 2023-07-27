import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL;


function StudentDetailsPage() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { studentId } = useParams();

  useEffect(() => {
    const getStudent = () => {
      axios
        .get(`${API_URL}/api/students/${studentId}`)
        .then((response) => {
          const oneStudent = response.data;
          setStudent(oneStudent);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    };

    getStudent();
  }, [studentId]);
  
  if (loading) return <div>Loading...</div>;

  return (
    <div className="StudentDetailsPage">
      <h3>Student Details</h3>
      
      {student && (
        <>
          <img src={student.image} alt={student.firstName} />
          <h1>{student.firstName} {student.lastName}</h1>
          <p><b>Email:</b> {student.email}</p>
          <p><b>Phone:</b> {student.phone}</p>
          <p><b>LinkedIn:</b> {student.linkedinUrl}</p>
          <p><b>Languages:</b> {student.languages.join(", ")}</p>
          <p><b>Program:</b> {student.program}</p>
          <p><b>Background:</b> {student.background}</p>
          <p><b>Image:</b> {student.image}</p>
          <p>
            <b>Cohort: </b>
            <Link to={`/cohorts/details/${student.cohort._id}`}>
            {student.cohort.cohortName}
            </Link>
          </p>
          <p><b>Projects:</b> {student.projects}</p>
          <Link to={`/students/edit/${student._id}`}>
            <button>Edit</button>
          </Link>
        </>
      )}

    </div>
  );
}

export default StudentDetailsPage;