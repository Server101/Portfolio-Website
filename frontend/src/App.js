import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import './App.css';
import HomeTemplate from './pages/HomeTemplate';

// Route for Home Template
<Route path="/" element={<HomeTemplate />} />






function App() {
  const [projects, setProjects] = useState([]);

  // 🔁 Fetch projects from backend on EC2
  useEffect(() => {
    fetch('http://localhost:3001/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error('API Error:', err));
  }, []);

  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects projects={projects} />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;