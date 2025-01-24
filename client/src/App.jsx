import { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CohortListPage from "./pages/CohortListPage";
import CohortDetailsPage from "./pages/CohortDetailsPage";
import CohortEditPage from "./pages/CohortEditPage";
import CohortCreatePage from "./pages/CohortCreatePage";
import StudentListPage from "./pages/StudentListPage";
import StudentDetailsPage from "./pages/StudentDetailsPage";
import StudentEditPage from "./pages/StudentEditPage";
import UserProfilePage from "./pages/UserProfilePage";

// Importación de componentes de autenticación
import Signup from "./components/Signup";
import Login from "./components/Login";

// Importación de protección de rutas
import IsPrivate from "./components/IsPrivate";  // Protege las rutas privadas
import IsAnon from "./components/IsAnon";        // Protege las rutas solo para usuarios no autenticados

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="App relative z-20 pt-20">
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      {isSidebarOpen && <Sidebar />}
      <div className={`content ${isSidebarOpen ? 'shifted' : ''} relative z-10`}>
        <Routes>
          {/* Ruta de inicio: redirige a dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          
          {/* Rutas de dashboard y detalles */}
          <Route path="/dashboard" element={<CohortListPage />} />
          <Route path="/students" element={<StudentListPage />} />
          <Route path="/cohorts/details/:cohortId" element={<CohortDetailsPage />} />
          <Route path="/cohorts/edit/:cohortId" element={<CohortEditPage />} />
          <Route path="/cohorts/create" element={<CohortCreatePage />} />
          <Route path="/students/details/:studentId" element={<StudentDetailsPage />} />
          <Route path="/students/edit/:studentId" element={<StudentEditPage />} />
          
          {/* Ruta protegida para el perfil */}
          <Route path="/profile" element={<IsPrivate><UserProfilePage /></IsPrivate>} />

          {/* Rutas de autenticación: solo para usuarios no autenticados */}
          <Route path="/signup" element={<IsAnon><Signup /></IsAnon>} />
          <Route path="/login" element={<IsAnon><Login /></IsAnon>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
