import React, { useState, useEffect } from 'react';
import '../assets/css/WordSlider.css';

const WordSlider = () => {
  const words = ['Full-Stack Engineer', 'Security Engineer', 'Cloud Architect', 'Data Analyst'];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="word-slider">
      <div
        className="word-slider-inner"
        style={{
          transform: `translateY(-${currentWord * 40}px)` // height must match .word-slide
        }}
      >
        {words.map((word, index) => (
          <div className="word-slide" key={index}>
            {word}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordSlider;
