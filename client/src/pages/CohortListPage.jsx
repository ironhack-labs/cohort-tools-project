import axios from "axios";
import { useEffect, useState } from "react";
import CohortCard from "../components/CohortCard";
import CohortFilterBar from "../components/CohortFilterBar";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL;

function CohortListPage() {
  const [cohorts, setCohorts] = useState([]);
  const [filteredCohorts, setFilteredCohorts] = useState([]);

  const handleChange = (event) => {
    if (event.target.value.toLowerCase() === "all") {
      setFilteredCohorts(cohorts);
    } else {
      setFilteredCohorts(
        cohorts.filter((cohort) => {
          return (
            cohort.campus.toLowerCase() === event.target.value.toLowerCase() ||
            cohort.program.toLowerCase() === event.target.value.toLowerCase()
          );
        })
      );
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/cohorts`)
      .then((response) => {
        setCohorts(response.data);
        setFilteredCohorts(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="CohortListPage">
      <CohortFilterBar handleChange={handleChange} />

      <div className="flex justify-between items-center p-2 font-bold border-b">
        <span style={{ flexBasis: "25%" }}>Cohort</span>
        <span style={{ flexBasis: "15%" }}>Program</span>
        <span style={{ flexBasis: "15%" }}>Format</span>
        <span style={{ flexBasis: "15%" }}>Ongoing</span>
        <span style={{ flexBasis: "25%" }}>Id</span>
      </div>

      {filteredCohorts &&
        filteredCohorts.map((cohort, index) => (
          <CohortCard
            key={cohort._id}
            cohort={cohort}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
          />
        ))}
    </div>
  );
}

export default CohortListPage;
