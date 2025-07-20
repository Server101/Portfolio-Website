import React, { useEffect, useState } from 'react';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/api/projects') // Automatically goes through NGINX proxy to backend
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  return (
    <div>
      <h1>My Projects</h1>
      <ul>
        {projects.map(proj => (
          <li key={proj.id}>{proj.name}</li>
        ))}
      </ul>
    </div>
  );
}