import React from "react";
import Navigation from "../components/layout/Navigation";
import BackgroundEffects from "../components/ui/BackgroundEffects";
import SideProgress from "../components/ui/SideProgress";
import AboutSection from "../sections/AboutSection";
import ContactSection from "../sections/ContactSection";
import HeroSection from "../sections/HeroSection";
import LiveProjectsSection from "../sections/LiveProjectsSection";
import SoftwareSection from "../sections/SoftwareSection";
import useActiveSection from "../hooks/useActiveSection";
import useRevealOnScroll from "../hooks/useRevealOnScroll";
import "../styles/luminaryPortfolio.css";

const sectionIds = ["home", "about", "projects", "software", "contact"];

export default function Home() {
  const activeSection = useActiveSection(sectionIds);
  useRevealOnScroll();

  return (
    <div className="portfolio-app">
      <BackgroundEffects />
      <Navigation activeSection={activeSection} />
      <SideProgress activeSection={activeSection} />
      <main>
        <HeroSection />
        <AboutSection />
        <LiveProjectsSection />
        <SoftwareSection />
        <ContactSection />
      </main>
    </div>
  );
}
