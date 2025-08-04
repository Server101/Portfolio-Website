// src/components/IAMScanner.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const IAMScanner = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");

  // Fetch logs on load
  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/iam/logs");
      setResults(res.data.logs || []);
    } catch (err) {
      setError("Failed to load IAM scan logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // Trigger new scan
  const runScan = async () => {
    try {
      setScanning(true);
      const res = await axios.get("/api/iam/scan");
      if (res.data?.success) {
        await fetchLogs(); // Refresh log view
      }
    } catch (err) {
      setError("Scan failed. Check server logs.");
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="iam-results mt-4">
      <h5>Latest IAM Scans:</h5>
      {error && <div className="alert alert-danger">{error}</div>}
      <button
        className="btn btn-primary mb-3"
        onClick={runScan}
        disabled={scanning}
      >
        {scanning ? "Scanning..." : "🔍 Run New Scan"}
      </button>

      {loading ? (
        <p>Loading logs...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped small">
            <thead>
              <tr>
                <th>Role Name</th>
                <th>Score</th>
                <th>Created At</th>
                <th>Gemini Summary</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row) => (
                <tr
                  key={row.id}
                  className={
                    row.score >= 90
                      ? "table-danger"
                      : row.score >= 70
                      ? "table-warning"
                      : "table-success"
                  }
                >
                  <td>{row.role_name}</td>
                  <td>{row.score}</td>
                  <td>{new Date(row.created_at).toLocaleString()}</td>
                  <td style={{ maxWidth: "500px", whiteSpace: "pre-wrap" }}>
                    {row.analysis}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default IAMScanner;