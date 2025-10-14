import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import EmotionDetector from './pages/EmotionDetector';
import DayPlanner from './pages/DayPlanner';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <div className="container-fluid pt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/emotion" element={<EmotionDetector />} />
          <Route path="/planner" element={<DayPlanner />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;
