import React from "react";
import WordSlider from "../components/WordSlider";
import HeroSignalField from "../components/ui/HeroSignalField";
import { highlights, profile, socialLinks } from "../data/portfolioContent";

export default function HeroSection() {
  return (
    <section className="portfolio-section hero-section" id="home">
      <HeroSignalField />
      <div className="section-shell hero-shell">
        <div className="hero-copy" data-reveal>
          <span className="eyebrow">AI Software Engineering portfolio</span>
          <h1>{profile.heroTitle}</h1>
          <WordSlider />
          <p>{profile.heroLead}</p>

          <div className="hero-actions">
            <a className="primary-button" href="#projects">View Live Projects</a>
            <a className="secondary-button" href="#contact">Contact Me</a>
          </div>

          <div className="hero-highlights" aria-label="Production highlights">
            {highlights.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="portrait-card" data-reveal>
          <div className="portrait-frame" aria-label="Ricardo Brown portrait">
            <img
              src={profile.portrait}
              alt="Ricardo Brown professional portrait"
              loading="eager"
            />
          </div>
          <div className="portrait-caption">
            <strong>{profile.name}</strong>
            <span>Software • Security • Cloud • AI</span>
          </div>
          <div className="social-links" aria-label="Social links">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <img src={link.image} alt={link.label} />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
