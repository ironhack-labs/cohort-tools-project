import { Link } from "react-router-dom";

function CohortCard({
  _id,
  program,
  inProgress,
  campus,
  cohortName,
  cohortSlug,
  className,
}) {
  return (
    <Link to={`/cohorts/details/${_id}`}>
      <div
        className={`CohortCard flex justify-between items-center p-3 mb-2 bg-white shadow-sm rounded border border-gray-200 hover:bg-gray-50 ${className}`}
      >
        <span style={{ flexBasis: "25%" }}>{cohortName}</span>
        <span style={{ flexBasis: "15%" }}>{program}</span>
        <span style={{ flexBasis: "15%" }}>{campus}</span>
        <span style={{ flexBasis: "15%" }}>{inProgress ? "✅" : "⬜️"}</span>
        <span style={{ flexBasis: "25%" }}>{cohortSlug}</span>
      </div>
    </Link>
  );
}

export default CohortCard;
