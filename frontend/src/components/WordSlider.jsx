import React, { useEffect, useState } from "react";
import { profile } from "../data/portfolioContent";

export default function WordSlider({ words = profile.rotatingRoles }) {
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((index) => (index + 1) % words.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="word-slider" aria-live="polite">
      <div className="word-slider-inner" style={{ transform: `translateY(-${currentWord * 42}px)` }}>
        {words.map((word) => (
          <div className="word-slide" key={word}>{word}</div>
        ))}
      </div>
    </div>
  );
}
