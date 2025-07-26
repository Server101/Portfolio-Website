import React, { useState } from 'react';
import axios from 'axios';

function ThreatDashboard() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post('/api/threat/analyze', { url });
      setResult(res.data);
    } catch (err) {
      setResult({ error: 'Failed to analyze the URL.' });
    }
    setLoading(false);
  };

  return (
    <div className="tm-white-bg p-4 rounded shadow text-start">
      <h4>Threat Analysis Tool</h4>
      <p>Enter a website URL to check for potential threats.</p>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
        <button className="btn btn-danger" onClick={handleAnalyze} disabled={!url || loading}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
      {result && (
        <div className="mt-3">
          {result.error ? (
            <p className="text-danger">{result.error}</p>
          ) : (
            <>
              <p><strong>URL:</strong> {result.url}</p>
              <p><strong>Threat Level:</strong> {result.threatLevel}</p>
              <p><strong>Issues Detected:</strong></p>
              <ul>
                {result.issues.map((issue, idx) => (
                  <li key={idx}>{issue}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ThreatDashboard;
