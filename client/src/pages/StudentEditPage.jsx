import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_STUDENT_FORM_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  linkedinUrl: "",
  languages: [],
  program: "",
  background: "",
  image: "",
  cohort: "",
};

function StudentEditPage() {
  const [student, setStudent] = useState({ ...DEFAULT_STUDENT_FORM_VALUES });
  const [cohorts, setCohorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  
  const { studentId } = useParams();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { ...student };

    setLoading(true);

    axios
      .put(`${API_URL}/api/students/${student._id}`, requestBody)
      .then(() => {
        navigate(`/students/details/${student._id}`);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = () => {
    axios
      .delete(`${API_URL}/api/students/${student._id}`)
      .then(() => {
        navigate(`/cohorts/details/${student.cohort._id}`);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    const { name, value, type, checked, options, multiple } = e.target;

    let inputValue = type === "checkbox" ? checked : value;

    if (multiple && options) {
      inputValue = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          inputValue.push(options[i].value);
        }
      }
    }

    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: inputValue,
    }));
  };

  useEffect(() => {
    const getStudent = () => {
      axios
        .get(`${API_URL}/api/students/${studentId}`)
        .then((response) => {
          const studentData = response.data;
          setStudent(studentData);
        })
        .catch((error) => console.log(error));
    };

    const getCohorts = () => {
      axios
        .get(`${API_URL}/api/cohorts`)
        .then((response) => {
          const cohortList = response.data;
          setCohorts(cohortList);
        })
        .catch((error) => console.log(error));
    };

    getStudent();
    getCohorts();
    setLoading(false);
  }, [studentId]);

  return (
    <div className="AddStudent">
      <h3>Edit Student</h3>

      {showDeleteConfirmation && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "300px",
            height: "200px",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Are you sure you want to delete this student?</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={student.firstName}
          onChange={handleChange}
        />

        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={student.lastName}
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={student.email}
          onChange={handleChange}
        />

        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={student.phone}
          onChange={handleChange}
        />

        <label>LinkedIn URL:</label>
        <input
          type="url"
          name="linkedinUrl"
          value={student.linkedinUrl}
          onChange={handleChange}
        />
        <label>Languages:</label>
        <select
          name="languages"
          value={student.languages}
          onChange={handleChange}
          multiple
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Portuguese">Portuguese</option>
          <option value="Dutch">Dutch</option>
          <option value="Other">Other</option>
        </select>

        <label>Program:</label>
        <select name="program" value={student.program} onChange={handleChange}>
          <option value="">-- Select a program --</option>
          <option value="Web Dev">Web Dev</option>
          <option value="UX/UI">UX/UI</option>
          <option value="Data Analytics">Data Analytics</option>
          <option value="Cybersecurity">Cybersecurity</option>
        </select>

        <label>Background:</label>
        <textarea
          type="text"
          name="background"
          value={student.background}
          onChange={handleChange}
        />

        <label>Image:</label>
        <input
          type="text"
          name="image"
          value={student.image}
          onChange={handleChange}
        />

        <label>Cohort:</label>
        <select
          name="cohort"
          value={student.cohort._id}
          onChange={handleChange}
        >
          <option value="">-- Select a cohort --</option>
          {cohorts.map((cohort) => (
            <option key={cohort._id} value={cohort._id}>
              {cohort.cohortName}
            </option>
          ))}
        </select>

        <button disabled={loading} type="submit">
          Save
        </button>

        <button disabled={loading} type="button" onClick={()=> setShowDeleteConfirmation(true)}>Delete</button>        
      </form>
    </div>
  );
}

export default StudentEditPage;
