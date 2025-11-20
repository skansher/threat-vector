import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import News from './Components/News.jsx';
import Profile from './Components/Profile.jsx';
import Infiltrators from './Components/Infiltrators.jsx';
import CreateProfile from './Components/CreateProfile.jsx';
import Home from './Components/Home.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/infiltrators" element={<Infiltrators/>} />
        <Route path="/createProfile" element={<CreateProfile/>} />
      </Routes>
    </Router>
  );
}

export default App;
