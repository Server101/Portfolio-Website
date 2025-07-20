import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';


 /* This is the react logo
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}  */

// Function to connect the backend to front
function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error('API Error:', err));
  }, []);

  return (
    <div>
      <h1>My Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <strong>{project.title}</strong> — {project.tech}
          </li>
        ))}
      </ul>
    </div>
  );

}


export default App;
