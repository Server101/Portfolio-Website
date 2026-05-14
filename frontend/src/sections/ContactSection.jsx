import React from "react";
import ContactForm from "../components/ContactForm";
import { profile } from "../data/portfolioContent";

export default function ContactSection() {
  return (
    <section className="portfolio-section contact-section" id="contact">
      <div className="section-shell two-column contact-grid">
        <div className="section-copy" data-reveal>
          <span className="eyebrow">Let’s Connect</span>
          <h2>Open to software, cloud, and security opportunities.</h2>
          <p>
            Feel free to reach out to discuss opportunities, innovative projects, or ways we can collaborate.
          </p>
          <a className="text-button" href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
        <div className="contact-card" data-reveal>
          <ContactForm />
        </div>
      </div>
      <footer className="site-footer">
        <span>Copyright © 2026 RicardoTech.com</span>
      </footer>
    </section>
  );
}
