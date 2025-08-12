import React, { useEffect, useRef, useState } from "react";
import "../assets/css/CustomAnimations.css"; // <-- make sure this import exists

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);
  const buttonRef = useRef(null);

  // Lock body scroll + trap focus when open
  useEffect(() => {
    document.body.classList.toggle("body--locked", open);

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && open && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open && drawerRef.current) {
      // focus first interactive element in drawer
      const first = drawerRef.current.querySelector("a,button");
      first?.focus();
    } else {
      buttonRef.current?.focus();
    }
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top shadow" style={{ zIndex: 1000 }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Brand */}
        <a className="navbar-brand fw-bold me-2" href="#home">
          RicardoTech
        </a>

        {/* Desktop inline menu */}
        <ul className="navbar-nav flex-row desktop-nav">
          <li className="nav-item mx-2">
            <a className="nav-link" href="#home">Home</a>
          </li>
          <li className="nav-item mx-2">
            <a className="nav-link" href="#services">About Me</a>
          </li>
          <li className="nav-item mx-2">
            <a className="nav-link" href="#projects">Projects</a>
          </li>
          <li className="nav-item mx-2">
            <a className="nav-link" href="#software">Software</a>
          </li>
          <li className="nav-item mx-2">
            <a className="nav-link" href="#contact">Contact</a>
          </li>
        </ul>

        {/* Mobile hamburger (shown on < lg) */}
        <button
          ref={buttonRef}
          className="btn nav-toggle"
          aria-label="Open menu"
          aria-controls="mobile-drawer"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span className="toggle-bar" />
          <span className="toggle-bar" />
          <span className="toggle-bar" />
        </button>
      </div>

      {/* Overlay */}
      <div className={`nav-overlay ${open ? "show" : ""}`} onClick={close} />

      {/* Slide-out drawer */}
      <aside
        id="mobile-drawer"
        ref={drawerRef}
        className={`mobile-drawer ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
      >
        <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
          <span className="navbar-brand fw-bold mb-0">RicardoTech</span>
          <button className="btn btn-link text-white fs-3" onClick={close} aria-label="Close menu">
            &times;
          </button>
        </div>

        <ul className="navbar-nav px-3 py-2">
          <li className="nav-item"><a className="nav-link" href="#home" onClick={close}>Home</a></li>
          <li className="nav-item"><a className="nav-link" href="#services" onClick={close}>About Me</a></li>
          <li className="nav-item"><a className="nav-link" href="#projects" onClick={close}>Projects</a></li>
          <li className="nav-item"><a className="nav-link" href="#software" onClick={close}>Software</a></li>
          <li className="nav-item"><a className="nav-link" href="#contact" onClick={close}>Contact</a></li>
        </ul>
      </aside>
    </nav>
  );
}
