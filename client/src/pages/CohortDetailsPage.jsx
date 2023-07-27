import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import StudentCard from "../components/StudentCard";
import StudentCreateForm from "../components/StudentCreateForm";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL;

function CohortDetailsPage() {
  const [cohort, setCohort] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showDrawer, setShowDrawer] = useState(false);

  const { cohortId } = useParams();

  const getCohort = useCallback(() => {
    axios
      .get(`${API_URL}/api/cohorts/${cohortId}`)
      .then((response) => {
        const oneCohort = response.data;
        setCohort(oneCohort);
      })
      .catch((error) => console.log(error));
  }
  , [cohortId]);

  const getStudents = useCallback(() => {
    axios
      .get(`${API_URL}/api/students/cohort/${cohortId}`)
      .then((response) => {
        const allStudents = response.data;
        setStudents(allStudents);
      })
      .catch((error) => console.log(error));
  }, [cohortId]);

  useEffect(() => {
    getCohort();
    getStudents();
    setLoading(false);
  }, [cohortId, getCohort, getStudents]);


  return (
    <div className="CohortDetails">
    <h1>Cohort Details</h1>
      {cohort && showDrawer && (
        <div className="drawer">
          <StudentCreateForm
            cohortId={cohort._id}
            cohortName={cohort.cohortName}
            callback={() => {
              setShowDrawer(false);
              getStudents();
            }}
            />
        </div>
      )}

      {showDrawer && <button onClick={() => setShowDrawer(false)}>Close</button>}
      {!showDrawer && <button onClick={() => setShowDrawer(true)}>Add Student</button>}


      {cohort && (
        <>
          <h1>{cohort.cohortName}</h1>
          <p>Format: {cohort.format}</p>
          <p>Program: {cohort.program}</p>
          <p>Campus: {cohort.campus}</p>
          <p>Start Date: {cohort.startDate}</p>
          <p>End Date: {cohort.endDate}</p>
          <p>In Progress: {cohort.inProgress ? "In Progress" : "Not Started" }</p>
          <p>Program Manager: {cohort.programManager}</p>
          <p>Lead Teacher: {cohort.leadTeacher}</p>
          <p>Total Hours: {cohort.totalHours}</p>


        </>
      )}

      <h2>Students</h2>

      {loading && <div>Loading...</div>}

      {students &&
        students.map((student) => (
          <StudentCard key={student._id} {...student} />
        ))}

      <Link to="/dashboard">
        <button>Cohorts</button>
      </Link>

      <Link to={`/cohorts/edit/${cohortId}`}>
        <button>Edit Cohort</button>
      </Link>
    </div>
  );
}

export default CohortDetailsPage;
