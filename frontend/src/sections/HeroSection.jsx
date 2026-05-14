import React, { useEffect, useMemo, useState } from "react";
import WordSlider from "../components/WordSlider";
import HeroSignalField from "../components/ui/HeroSignalField";
import { highlights, profile, socialLinks } from "../data/portfolioContent";

export default function HeroSection() {
  const portraitFrames = useMemo(
    () => [profile.portrait, profile.portraitAlternate].filter(Boolean),
    []
  );
  const hasAlternatePortrait = portraitFrames.length > 1;
  const [portraitStage, setPortraitStage] = useState("primary");

  useEffect(() => {
    if (!hasAlternatePortrait) return undefined;

    const revealAlternatePortrait = window.setTimeout(() => {
      setPortraitStage("alternate");
    }, 4000);

    const returnToPrimaryPortrait = window.setTimeout(() => {
      setPortraitStage("returning");
    }, 10000);

    const finishPortraitRefresh = window.setTimeout(() => {
      setPortraitStage("complete");
    }, 13600);

    return () => {
      window.clearTimeout(revealAlternatePortrait);
      window.clearTimeout(returnToPrimaryPortrait);
      window.clearTimeout(finishPortraitRefresh);
    };
  }, [hasAlternatePortrait]);

  const portraitClassName = [
    "portrait-frame",
    "portrait-frame-animated",
    hasAlternatePortrait ? `portrait-stage-${portraitStage}` : "portrait-stage-static",
  ].join(" ");

  return (
    <section className="portfolio-section hero-section" id="home">
      <HeroSignalField />
      <div className="section-shell hero-shell">
        <div className="hero-copy" data-reveal>
          <span className="eyebrow">Cloud security portfolio</span>
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
          <div className={portraitClassName} aria-label="Ricardo Brown portrait">
            <img
              className="portrait-image-layer portrait-image-primary"
              src={portraitFrames[0]}
              alt="Ricardo Brown professional portrait"
              loading="eager"
            />
            {hasAlternatePortrait && (
              <img
                className="portrait-image-layer portrait-image-alternate"
                src={portraitFrames[1]}
                alt="Ricardo Brown alternate professional portrait"
                loading="lazy"
              />
            )}
          </div>
          <div className="portrait-caption">
            <strong>{profile.name}</strong>
            <span>Software • Security • Cloud • AI</span>
          </div>
          <div className="social-links" aria-label="Social links">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}>
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
