import { useState, useEffect, useContext } from "react";
import axios from "axios";
import CohortFilterBar from "../components/CohortFilterBar";
import CohortCard from "../components/CohortCard";
import { AuthContext } from "../context/auth.context";  

const API_URL = import.meta.env.VITE_API_URL;

function CohortListPage() {
  const [cohorts, setCohorts] = useState([]);
  const [campusQuery, setCampusQuery] = useState("");
  const [programQuery, setProgramQuery] = useState("");
  const { user } = useContext(AuthContext); 

  const handleChange = (event, updateState) => {
    updateState(event.target.value);
  };

  useEffect(() => {
    if (user) {  
      let queryString = "";
      if (campusQuery) queryString += `campus=${campusQuery}&`;
      if (programQuery) queryString += `program=${programQuery}`;

      axios
        .get(`${API_URL}/api/cohorts?${queryString}`)
        .then((response) => {
          setCohorts(response.data);
        })
        .catch((error) => console.log(error));
    } else {
      console.log("User not logged in");
    }
  }, [campusQuery, programQuery, user]);

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
      {user && (
        <>
          <CohortFilterBar
            campusQuery={campusQuery}
            setCampusQuery={setCampusQuery}
            programQuery={programQuery}
            setProgramQuery={setProgramQuery}
            handleChange={handleChange}
          />

          <div className="flex justify-between items-center p-2 font-bold border-b">
            <span style={{ flexBasis: "25%" }}>Cohort</span>
            <span style={{ flexBasis: "15%" }}>Program</span>
            <span style={{ flexBasis: "15%" }}>Format</span>
            <span style={{ flexBasis: "15%" }}>Ongoing</span>
            <span style={{ flexBasis: "25%" }}>Id</span>
          </div>

          {cohorts &&
            cohorts.map((cohort, index) => (
              <CohortCard
                key={cohort._id}
                {...cohort}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              />
            ))}
        </>
      )}
    </div>
  );
}

export default CohortListPage;

