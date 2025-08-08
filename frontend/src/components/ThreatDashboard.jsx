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
  const logsPerPage = 3;

  useEffect(() => {
    fetchLogs();
  }, []);

  const validateUrlOrIp = (input) => {
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
    const ipPattern = /^\d{1,3}(\.\d{1,3}){3}$/;
    return urlPattern.test(input) || ipPattern.test(input);
  };

  const normalizeList = (data) => {
    // backend might return array OR { success, results }
    const list = Array.isArray(data) ? data : (data?.results || []);
    // flags may be stored as JSON string in DB
    return list.map((r) => ({
      ...r,
      flags: Array.isArray(r.flags)
        ? r.flags
        : (() => { try { return JSON.parse(r.flags || '[]'); } catch { return []; } })(),
    }));
  };

  const fetchLogs = async (level = '') => {
    setLogsLoading(true);
    setError('');
    try {
      // ✅ SAME-ORIGIN through Nginx
      const res = await axios.get(`/api/threat${level ? `?threatLevel=${level}` : ''}`);
      const list = normalizeList(res.data);
      setLogs(list);
      const filtered = level ? list.filter((log) => log.threat_level === level) : list;
      setFilteredLogs(filtered);
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
    if (!validateUrlOrIp(url)) {
      setError('Please enter a valid website URL or IP address.');
      return;
    }
    setLoading(true);
    try {
      // ✅ SAME-ORIGIN through Nginx
      await axios.post('/api/threat/analyze', { websiteUrl: url });
      await fetchLogs();
      setUrl('');
    } catch (err) {
      console.error(err);
      setError('Failed to analyze the URL.');
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const currentLogs = filteredLogs.slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage);

  return (
    <div>
      <h4>Security Dashboard</h4>

      <div className="text-center mb-3">
        <input
          type="text"
          placeholder="Enter URL or IP address"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="form-control mb-2 mx-auto"
          style={{ maxWidth: '500px' }}
        />
        <button className="btn btn-primary" onClick={analyzeUrl} disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      <div className="mb-3" style={{ maxWidth: '200px' }}>
        <select
          className="form-select custom-dropdown"
          style={{ backgroundColor: 'white', color: 'black', border: '1px solid black', cursor: 'pointer' }}
          onChange={(e) => fetchLogs(e.target.value)}
        >
          <option value="">All Threat Levels</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {error && <p className="text-danger text-center">{error}</p>}

      {logsLoading ? (
        <div className="text-center mt-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Website</th>
                <th>Threat Level</th>
                <th>Description</th>
                <th>Score</th>
                <th>Flags</th>
                <th>Detected At</th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.map((log, idx) => (
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
                  <td>{log.score}</td>
                  <td>{Array.isArray(log.flags) ? log.flags.join(', ') : ''}</td>
                  <td>{new Date(log.detected_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-center mt-3">
            <button
              className="btn btn-outline-dark me-2"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button
              className="btn btn-outline-dark"
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
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
