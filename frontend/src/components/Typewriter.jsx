import React, { useState, useEffect } from 'react';
import './Typewriter.css'; // We'll create this file next

const Typewriter = ({ words, speed = 120, pause = 1500 }) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setText(currentWord.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, speed / 2);
    } else {
      timeout = setTimeout(() => {
        setText(currentWord.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, speed);
    }

    if (!isDeleting && charIndex === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((wordIndex + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words, speed, pause]);

  return (
    <span className="typewriter">
      {text}
      <span className="cursor" />
    </span>
  );
};

export default Typewriter;
