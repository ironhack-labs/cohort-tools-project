import { Link } from "react-router-dom";

function CohortFilterBar({
  campusQuery,
  setCampusQuery,
  programQuery,
  setProgramQuery,
  handleChange,
}) {
  return  (
    <div className="filter-bar flex justify-between items-center mb-4 p-2 px-8 bg-gray-200 rounded">
      <div className="flex justify-start items-center space-x-8">
        <label htmlFor="campus" className="flex items-center">
          <span className="mr-2">Campus:</span>
          <select
            name="campus"
            id="campus"
            value={campusQuery}
            onChange={(e) => handleChange(e, setCampusQuery)}
            className="p-1"
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

        <label htmlFor="program" className="flex items-center">
          <span className="mr-2">Program:</span>
          <select
            name="program"
            id="program"
            value={programQuery}
            onChange={(e) => handleChange(e, setProgramQuery)}
            className="p-1"
          >
            <option value="">All</option>
            <option value="Web Dev">Web Development</option>
            <option value="UX/UI">UX/UI</option>
            <option value="Data Analytics">Data Analytics</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>
        </label>
      </div>

      <Link to="/cohorts/create" className="ml-auto">
        <button className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-500 px-6">Create</button>
      </Link>
    </div>
  );
}

export default CohortFilterBar;
