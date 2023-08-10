import { useState, useEffect } from "react";
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


function StudentCreateForm({ cohortId, cohortName, callback }) {
  const [student, setStudent] = useState({ ...DEFAULT_STUDENT_FORM_VALUES });
  const [submitting, setSubmitting] = useState(false);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { ...student, cohort: cohortId };
    
    setSubmitting(true);

    axios
      .post(`${API_URL}/api/students`, requestBody)
      .then(() => {
        // Reset the state to clear the inputs
        setStudent({ ...DEFAULT_STUDENT_FORM_VALUES, cohort: cohortId });
        setSubmitting(false);
        callback();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setStudent({ ...DEFAULT_STUDENT_FORM_VALUES, cohort: cohortId });
  }, [cohortId])


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
      [name]: inputValue
    }));
  };

  useEffect(() => {
    setStudent({ ...DEFAULT_STUDENT_FORM_VALUES });
  }, [cohortId]);


  
  return (
    <div className="AddStudent">
      <h3>Edit Student</h3>

      <form onSubmit={handleSubmit}>


        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={student.firstName}
          onChange={handleChange}
          disabled={submitting}
        />

        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={student.lastName}
          onChange={handleChange}
          disabled={submitting}          
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={student.email}
          onChange={handleChange}
          disabled={submitting}          
        />

        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={student.phone}
          onChange={handleChange}
          disabled={submitting}          
        />

        <label>LinkedIn URL:</label>
        <input
          type="url"
          name="linkedinUrl"
          value={student.linkedinUrl}
          onChange={handleChange}
          disabled={submitting}          
        />

        <label>Languages:</label>
        <select
          name="languages"
          value={student.languages}
          onChange={handleChange}
          multiple
          disabled={submitting}          
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
        <select
          name="program"
          value={student.program}
          onChange={handleChange}
          disabled={submitting}
        >
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
          disabled={submitting}
        />

        <label>Image:</label>
        <input
          type="text"
          name="image"
          value={student.image}
          onChange={handleChange}
          disabled={submitting}
        />

        <label>Cohort:</label>
        <select
          name="cohort"
          value={cohortId}
          onChange={handleChange}
          disabled    
        >
          <option value={cohortId}>{cohortName}</option>
        </select>

        
        <button disabled={submitting} type="submit">Save</button>
      </form>
    </div>
  );
}

export default StudentCreateForm;