import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import News from './Components/News.jsx';
import Profile from './Components/Profile.jsx';
import Infiltrators from './Components/Infiltrators.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/news" />} />
        <Route path="/news" element={<News />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/infiltrators" element={<Infiltrators/>} />
      </Routes>
    </Router>
  );
}

export default App;
