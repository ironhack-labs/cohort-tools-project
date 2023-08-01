import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import CohortListPage from "./pages/CohortListPage";
import CohortDetailsPage from "./pages/CohortDetailsPage";
import CohortEditPage from "./pages/CohortEditPage";
import CohortCreatePage from "./pages/CohortCreatePage";
import StudentListPage from "./pages/StudentListPage";
import StudentDetailsPage from "./pages/StudentDetailsPage";
import StudentEditPage from "./pages/StudentEditPage";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Navigate to="/dashboard" />} />
        <Route exact path="/dashboard" element={<CohortListPage />} />
        <Route exact path="/students" element={<StudentListPage />} />
        <Route exact path="/cohorts/details/:cohortId" element={<CohortDetailsPage />} />
        <Route exact path="/cohorts/edit/:cohortId" element={<CohortEditPage />} />
        <Route exact path="/cohorts/create" element={<CohortCreatePage />} />
        <Route exact path="/students/details/:studentId" element={<StudentDetailsPage />} />
        <Route exact path="/students/edit/:studentId" element={<StudentEditPage />} />
        
      </Routes>
    </div>
  );
}

export default App;
