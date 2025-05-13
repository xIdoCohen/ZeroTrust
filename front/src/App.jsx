import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";
import Navbar from "./Components/navbar/Navbar";
import Login from "./Components/login/Login";
import Dashboard from "./Components/dashboard/Dashboard"
import OtpPage from "./Components/otppage/OtpPage";
import PrivateRoute from "./Components/privateRoute/PrivateRoute"
import AdminPanel from "./Components/adminPanel/AdminPanel";
import "./global.css"

function App() {

  return (
    <Router>
    
      <Navbar />
      <div className="mainScreen">
        <Routes >
          <Route path="/" element={<h1>homepage</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
