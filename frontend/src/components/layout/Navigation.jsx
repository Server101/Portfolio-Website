import React, { useState } from "react";
import { navItems } from "../../data/portfolioContent";

export default function Navigation({ activeSection }) {
  const [open, setOpen] = useState(false);

  const handleNavigate = () => setOpen(false);

  return (
    <header className="site-header">
      <a className="brand-mark" href="#home" aria-label="RicardoTech home" onClick={handleNavigate}>
        <span className="brand-orb">R</span>
        <span>
          <strong>RicardoTech</strong>
          <small>Cloud • Security • AI</small>
        </span>
      </a>

      <button
        className="nav-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
        {navItems.map((item) => {
          const id = item.href.replace("#", "");
          return (
            <a
              key={item.href}
              href={item.href}
              className={activeSection === id ? "is-active" : ""}
              onClick={handleNavigate}
            >
              {item.label}
            </a>
          );
        })}
        <span className="nav-divider" />
        <a href="https://github.com/Server101" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/Ricardo-Tech" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </nav>
    </header>
  );
}
