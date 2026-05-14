import React from "react";
import SoftwareGrid from "../components/SoftwareGrid";

export default function SoftwareSection() {
  return (
    <section className="portfolio-section" id="software">
      <div className="section-shell">
        <div className="section-heading" data-reveal>
          <span className="eyebrow">Software</span>
          <h2>Selected repositories and engineering work.</h2>
          <p>Public code examples that connect my software engineering, systems, and security interests.</p>
        </div>
        <div data-reveal>
          <SoftwareGrid />
        </div>
      </div>
    </section>
  );
}
