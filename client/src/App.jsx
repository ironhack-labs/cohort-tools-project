import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CohortCreatePage from "./pages/CohortCreatePage";
import CohortDetailsPage from "./pages/CohortDetailsPage";
import CohortEditPage from "./pages/CohortEditPage";
import CohortListPage from "./pages/CohortListPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StudentDetailsPage from "./pages/StudentDetailsPage";
import StudentEditPage from "./pages/StudentEditPage";
import StudentListPage from "./pages/StudentListPage";
import UserProfilePage from "./pages/UserProfilePage";

import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="App relative z-20 pt-20">
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      {isSidebarOpen && <Sidebar />}
      <div
        className={`content ${isSidebarOpen ? "shifted" : ""} relative z-10`}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<CohortListPage />} />
          <Route path="/students" element={<StudentListPage />} />
          <Route
            path="/cohorts/details/:cohortId"
            element={<CohortDetailsPage />}
          />
          <Route path="/cohorts/edit/:cohortId" element={<CohortEditPage />} />
          <Route path="/cohorts/create" element={<CohortCreatePage />} />
          <Route
            path="/students/details/:studentId"
            element={<StudentDetailsPage />}
          />
          <Route
            path="/students/edit/:studentId"
            element={<StudentEditPage />}
          />
          <Route
            path="/profile"
            element={
              <IsPrivate>
                <UserProfilePage />
              </IsPrivate>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
