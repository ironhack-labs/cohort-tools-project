import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function CohortCard({
  _id,
  cohortSlug,
  cohortName,
  program,
  format,
  campus,
  // startDate,
  // endDate,
  // inProgress,
  // programManager,
  // leadTeacher,
  // totalHours,
}) {
  return (
    <div className="CohortCard card">
      <Link to={`/cohorts/details/${_id}`}>
        <h3>{cohortName}</h3>
      </Link>
      <p style={{ maxWidth: "400px" }}>{cohortSlug} </p>
      <p style={{ maxWidth: "400px" }}>{campus} </p>
      <p style={{ maxWidth: "400px" }}>{program} </p>
      <p style={{ maxWidth: "400px" }}>{format} </p>
    </div>
  );
}

export default CohortCard;
