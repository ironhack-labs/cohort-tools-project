import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import CohortCard from "../components/CohortCard";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL;

function CohortListPage() {
  const [cohorts, setCohorts] = useState([]);
  const [campusQuery, setCampusQuery] = useState("");
  const [programQuery, setProgramQuery] = useState("");

  const handleChange = (event, updateState) => {
    updateState(event.target.value);
  };

  useEffect(() => {
    let queryString = "";
    if (campusQuery) queryString += `campus=${campusQuery}&`;
    if (programQuery) queryString += `program=${programQuery}`;

    axios
      .get(`${API_URL}/api/cohorts?${queryString}`)
      .then((response) => {
        setCohorts(response.data)})
      .catch((error) => console.log(error));
  }, [campusQuery, programQuery]);

  const getAllCohorts = () => {
    axios
      .get(`${API_URL}/api/cohorts`)
      .then((response) => {
        setCohorts(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllCohorts();
  }, []);

  return (
    <div className="CohortListPage">
      <Link to="/cohorts/create">
        <button>Create</button>
      </Link>

      <label htmlFor="campus">
        Campus
        <br />
        <select
          name="campus"
          id="campus"
          value={campusQuery}
          onChange={(e) => handleChange(e, setCampusQuery)}
        >
          <option value="">All</option>
          <option value="Madrid">Madrid</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Miami">Miami</option>
          <option value="Paris">Paris</option>
          <option value="Berlin">Berlin</option>
          <option value="Amsterdam">Amsterdam</option>
          <option value="Remote">Remote</option>
        </select>
      </label>

      <label htmlFor="campus">
        Program
        <br />
        <select
          name="program"
          id="program"
          value={programQuery}
          onChange={(e) => handleChange(e, setProgramQuery)}
        >
          <option value="">All</option>
          <option value="Web Dev">Web Development</option>
          <option value="UX/UI">UX/UI</option>
          <option value="Data Analytics">Data Analytics</option>
          <option value="Cybersecurity">Cybersecurity</option>
        </select>
      </label>


      {cohorts && cohorts.map((cohort) => (
        <CohortCard key={cohort._id} {...cohort} />
      ))}
    </div>
  );
}

export default CohortListPage;
