import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ThreatDashboard() {
  const [url, setUrl] = useState('');
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeUrl = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://3.142.144.88:3001/api/threat/analyze', { websiteUrl: url });
      setLogs(prev => [response.data, ...prev]);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze the URL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>Security Dashboard</h4>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
        className="form-control mb-2"
      />
      <button className="btn btn-primary" onClick={analyzeUrl} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {error && <p className="text-danger mt-2">{error}</p>}

      <ul className="mt-3">
        {logs.map((log, idx) => (
          <li key={idx}>
            <strong>{log.websiteUrl}</strong> — {log.threatLevel} — {log.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ThreatDashboard;
