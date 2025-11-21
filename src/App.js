import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import News from './Components/News.jsx';
import Profile from './Components/Profile.jsx';
import ResearchChat from './Components/AIResearchChat.jsx';
import Home from './Components/Home.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/researchChat" element={<ResearchChat/>} />
      </Routes>
    </Router>
  );
}

export default App;
