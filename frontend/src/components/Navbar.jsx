import React from 'react';

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-dark bg-dark fixed-top shadow"
      style={{ zIndex: 1000 }}
    >
      <div className="container-fluid d-flex justify-content-start align-items-center">
        {/* Logo/Brand on far left */}
        <a className="navbar-brand fw-bold me-4" href="#home">
          RicardoTech
        </a>

        {/* Navigation links right next to brand */}
        <ul className="navbar-nav flex-row">
          <li className="nav-item mx-2">
            <a className="nav-link" href="#home">
              Home
            </a>
          </li>
          <li className="nav-item mx-2">
            <a className="nav-link" href="#services">
              About Me
            </a>
          </li>
          <li className="nav-item mx-2">
            <a className="nav-link" href="#projects">
              Projects
            </a>
          </li>

  

          <li className="nav-item mx-2">
            <a className="nav-link" href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
