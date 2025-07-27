import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ThreatDashboard() {
  const [url, setUrl] = useState('');
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [logsLoading, setLogsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const logsPerPage = 5;

  useEffect(() => {
    fetchLogs();
  }, []);

  const validateUrl = (input) => {
    const pattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
    return pattern.test(input);
  };

  const fetchLogs = async (level = '') => {
    setLogsLoading(true);
    setError('');
    try {
      const res = await axios.get(`http://3.142.144.88:3001/api/threat/logs${level ? `?threatLevel=${level}` : ''}`);
      setLogs(res.data);
      setFilteredLogs(res.data);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch logs.');
    } finally {
      setLogsLoading(false);
    }
  };

  const analyzeUrl = async () => {
    setError('');
    if (!validateUrl(url)) {
      setError('Please enter a valid website URL.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://3.142.144.88:3001/api/threat/analyze', { websiteUrl: url });
      setLogs(prev => [response.data, ...prev]);
      setFilteredLogs(prev => [response.data, ...prev]);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze the URL.');
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const currentLogs = filteredLogs.slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage);

  
 return (
  <div>
    <h4>Security Dashboard</h4>

    {/* Centered URL input */}
    <div className="text-center mb-3">
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="form-control mb-2 mx-auto"
        style={{ maxWidth: '500px' }}
      />
      <button className="btn btn-primary" onClick={analyzeUrl} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
    </div>

    {/* Threat level dropdown UNDER Analyze, left-aligned */}
   <div className="d-flex justify-content-start mb-3">
  <select
    className="form-select custom-dropdown"
    style={{ width: '200px' }}
    onChange={(e) => fetchLogs(e.target.value)}
  >
    <option value="">All Threat Levels</option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>
</div>


    {/* Error Message */}
    {error && <p className="text-danger mt-2 text-center">{error}</p>}

    {/* Loading spinner for logs */}
    {logsLoading ? (
      <div className="text-center mt-3">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    ) : (
      <>
        {/* Log Table */}
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Website</th>
              <th>Threat Level</th>
              <th>Description</th>
              <th>Detected At</th>
            </tr>
          </thead>
          <tbody>
            {logs
              .slice(currentPage * logsPerPage, (currentPage + 1) * logsPerPage)
              .map((log, idx) => (
                <tr key={idx}>
                  <td>{log.website_url}</td>
                  <td>
                    <span
                      className={`badge ${
                        log.threat_level === 'High'
                          ? 'bg-danger'
                          : log.threat_level === 'Medium'
                          ? 'bg-warning text-dark'
                          : 'bg-success'
                      }`}
                    >
                      {log.threat_level}
                    </span>
                  </td>
                  <td>{log.description}</td>
                  <td>{new Date(log.detected_at).toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
            disabled={currentPage === 0}
          >
            Prev
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={(currentPage + 1) * logsPerPage >= logs.length}
          >
            Next
          </button>
        </div>
      </>
    )}
  </div>
);

}

export default ThreatDashboard;
