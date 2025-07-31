// components/WordCloudVisualizer.jsx
import React, { useEffect, useState } from 'react';
import WordCloud from 'react-wordcloud';
import axios from 'axios';

const options = {
  rotations: 2,
  rotationAngles: [-90, 0],
  fontSizes: [14, 60],
};

const WordCloudVisualizer = ({ category }) => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;

    setLoading(true);

    const fetchWords = async () => {
      try {
        const res = await axios.get(`/api/wordcloud?category=${category}`);
        const wordList = res.data.map((word) => ({
          text: word.keyword,
          value: word.frequency,
        }));
        setWords(wordList);
      } catch (error) {
        console.error('Error fetching word data:', error);
        setWords([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, [category]);

  return (
    <div style={{ height: 400 }}>
      {loading ? (
        <p>Loading Word Cloud...</p>
      ) : words.length > 0 ? (
        <WordCloud words={words} options={options} />
      ) : (
        <p>No data found for category: {category}</p>
      )}
    </div>
  );
};

export default WordCloudVisualizer;
