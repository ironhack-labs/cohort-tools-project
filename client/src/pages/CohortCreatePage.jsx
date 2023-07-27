import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createCohortSlug, convertSlugToName } from "../utils/index";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_COHORT_FORM_VALUES = {
  cohortSlug: "format-program-campus-startDate",
  cohortName: "",
  format: "",
  program: "",
  campus: "",
  startDate: "2030-01-01",
  endDate: "2030-01-01",
  inProgress: false,
  programManager: "",
  leadTeacher: "",
  totalHours: 0,
};

function CohortCreatePage() {
  const [cohort, setCohort] = useState({ ...DEFAULT_COHORT_FORM_VALUES });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const cohortSlug = createCohortSlug({ ...cohort, [name]: value });
    const cohortName = convertSlugToName(cohortSlug);

    setCohort((prevCohort) => ({
      ...prevCohort,
      cohortSlug,
      cohortName,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      ...cohort,
    };

    axios
      .post(`${API_URL}/api/cohorts`, requestBody)
      .then((response) => {
        const newCohort = response.data;
        console.log("newCohort", newCohort);

        navigate(`/cohorts/details/${newCohort._id}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="CohortCreatePage">
      <h3>Create Cohort</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="cohortSlug"
          id="cohortSlug"
          value={cohort.cohortSlug}
          onChange={handleChange}
          disabled
        />

        <label htmlFor="cohortName">Cohort Name</label>
        <input
          type="text"
          name="cohortName"
          id="cohortName"
          value={cohort.cohortName}
          onChange={handleChange}
          disabled
        />

        <label htmlFor="format">Format</label>
        <select
          name="format"
          id="format"
          value={cohort.format}
          onChange={handleChange}
        >
          <option value="">-- Select Format --</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
        </select>

        <label htmlFor="program">Program</label>
        <select
          name="program"
          id="program"
          value={cohort.program}
          onChange={handleChange}
        >
          <option value="">-- Select Program --</option>
          <option value="Web Dev">Web Development</option>
          <option value="UX/UI">UX/UI</option>
          <option value="Data Analytics">Data Analytics</option>
          <option value="Cybersecurity">Cybersecurity</option>
        </select>

        <label htmlFor="campus">Campus</label>
        <select
          name="campus"
          id="campus"
          value={cohort.campus}
          onChange={handleChange}
        >
          <option value="">-- Select Campus --</option>
          <option value="Madrid">Madrid</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Miami">Miami</option>
          <option value="Paris">Paris</option>
          <option value="Berlin">Berlin</option>
          <option value="Amsterdam">Amsterdam</option>
          <option value="Lisbon">Lisbon</option>
          <option value="Remote">Remote</option>
        </select>

        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          value={cohort.startDate}
          onChange={handleChange}
        />

        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          name="endDate"
          id="endDate"
          value={cohort.endDate}
          onChange={handleChange}
        />

        <label htmlFor="inProgress">In Progress</label>
        <input
          type="checkbox"
          name="inProgress"
          id="inProgress"
          value={cohort.inProgress}
          onChange={handleChange}
        />

        <label htmlFor="programManager">Program Manager</label>
        <input
          type="text"
          name="programManager"
          id="programManager"
          value={cohort.programManager}
          onChange={handleChange}
        />

        <label htmlFor="leadTeacher">Lead Teacher</label>
        <input
          type="text"
          name="leadTeacher"
          id="leadTeacher"
          value={cohort.leadTeacher}
          onChange={handleChange}
        />

        <label htmlFor="totalHours">Total Hours</label>
        <input
          type="number"
          name="totalHours"
          id="totalHours"
          value={cohort.totalHours}
          onChange={handleChange}
        />

        <br />

        <button type="submit">Create Cohort</button>
      </form>
    </div>
  );
}

export default CohortCreatePage;
