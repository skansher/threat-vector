import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import News from './Components/News';
import Profile from './Components/Profile';
import Archive from './Components/Archive';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/news" />} />
        <Route path="/news" element={<News />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
    </Router>
  );
}

export default App;
