import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Sidebar() {
  const location = useLocation();
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="sidebar bg-white text-black p-4">
      <ul>
        {isLoggedIn && (
          <>
            <li>
              <Link
                to="/dashboard"
                className={location.pathname === "/dashboard" ? "active" : ""}
              >
                Cohorts
              </Link>
            </li>
            <li>
              <Link
                to="/students"
                className={location.pathname === "/students" ? "active" : ""}
              >
                Students
              </Link>
            </li>
          </>
        )}
        <li>
          <Link
            to="/profile"
            className={location.pathname === "/profile" ? "active" : ""}
          >
            User Profile
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
