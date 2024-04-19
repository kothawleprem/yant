import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/loginPage";
import OTPPage from "./pages/auth/OTPPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import NotesPage from "./pages/dashboard/NotesPage";
import NotePage from "./pages/dashboard/NotePage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp" element={<OTPPage />} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/dashboard/topic" element={<NotesPage/>} />
        <Route path="/dashboard/topic/clip" element={<NotePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
