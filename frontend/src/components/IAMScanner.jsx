// src/components/IAMScanner.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const IAMScanner = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Normalize result format
  const normalizeResult = (data) =>
    data.map((item, idx) => ({
      id: item.id || idx,
      roleName: item.roleName || item.role_name,
      score: item.score || 0,
      analysis: item.analysis || "No analysis available.",
      createdAt: item.created_at || new Date().toISOString(),
    }));

  // Fetch logs on load
  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/iam/logs");
      const normalized = normalizeResult(res.data.logs || []);
      setResults(normalized);
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
      setError("");
      setMessage("");
      setScanning(true);

      const res = await axios.get("/api/iam/scan");

      if (res.data?.success && Array.isArray(res.data.results)) {
        const normalized = normalizeResult(res.data.results);
        setResults(normalized);
        setMessage("✅ New IAM scan completed and results updated.");
      } else {
        setError("Scan completed but no results returned.");
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
      <p className="text-muted small">
        This scan automatically inspects IAM roles in your AWS account — no input required.
      </p>

      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <button
        className="btn btn-primary mb-3"
        onClick={runScan}
        disabled={scanning}
      >
        {scanning ? "🔄 Scanning AWS IAM..." : "🔍 Run New Scan"}
      </button>

      {loading || scanning ? (
        <p>Loading IAM scan results...</p>
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
                  <td>{row.roleName}</td>
                  <td>{row.score}</td>
                  <td>{new Date(row.createdAt).toLocaleString()}</td>
                  <td style={{ maxWidth: "500px", whiteSpace: "pre-wrap" }}>
                    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                      {row.analysis}
                    </div>
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
