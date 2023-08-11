import logo from "./../assets/logo-ironhack-blue.png";
import { useLocation } from "react-router-dom";

function Navbar({ toggleSidebar }) {
  const location = useLocation();

  const getCurrentLinkText = (pathname) => {
    const routes = {
      "/dashboard": "Cohorts",
      "/students": "Students",
      "/cohorts/details/:cohortId": "Cohort Details",
      "/cohorts/edit/:cohortId": "Edit Cohort",
      "/cohorts/create": "Create Cohort",
      "/students/details/:studentId": "Student Details",
      "/students/edit/:studentId": "Edit Student",
    };

    for (let route in routes) {
      let regexPattern = new RegExp("^" + route.replace(/:\w+/g, "\\w+") + "$");
      if (regexPattern.test(pathname)) {
        return routes[route];
      }
    }
    return "";
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container flex justify-between items-center">
        {/* Left Flex Container for burger icon and text */}
        <div className="flex items-center space-x-2 w-1/4">
          <button
            className="flex items-center text-l py-1"
            onClick={toggleSidebar}
          >
            ☰
          </button>
          <span className="text-xl">
            {getCurrentLinkText(location.pathname)}
          </span>
        </div>

        {/* Center Flex Container for logo */}
        <div className="flex justify-center w-1/2">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
        </div>

        {/* Right Flex Container (kept for symmetry) */}
        <div className="w-1/4">{/* Empty for now */}</div>
      </div>
    </nav>
  );
}

export default Navbar;
