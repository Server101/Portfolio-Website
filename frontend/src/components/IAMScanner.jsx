// src/components/IAMScanner.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

// ← Add this immediately after your imports
const API_BASE = process.env.REACT_APP_API_URL || "";

const IAMScanner = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch IAM scan results
  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/iam/logs`);
      console.log("✅ Raw response from backend:", res.data);
      setResults(res.data.results || []);
    } catch (err) {
      console.error("❌ Failed to fetch logs:", err);
      setError("Failed to load IAM scan logs.");
    } finally {
      setLoading(false);
    }
  };

  // Trigger a new scan
  const runScan = async () => {
    if (scanning) return;
    try {
      setScanning(true);
      setError("");
      setMessage("");
      const { data } = await axios.get(`${API_BASE}/api/iam/scan`);
      console.log("🚀 /scan response:", data);

      if (data.success && Array.isArray(data.results)) {
        setResults(data.results);
        setMessage(
          data.results.length > 0
            ? `✅ New scan complete: ${data.results.length} role(s) analyzed.`
            : "✅ IAM scan complete. No misconfigurations detected — great job!"
        );
      } else {
        console.warn("⚠️ /scan returned no usable results:", data);
        setError("⚠️ Scan completed but no usable results returned.");
      }
    } catch (err) {
      console.error("❌ Scan error:", err);
      setError("❌ Scan failed. Check server logs.");
    } finally {
      setScanning(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="iam-results mt-4">
      <h5>Latest IAM Scans:</h5>
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
      ) : results.length === 0 ? (
        <p className="text-muted">
          No scan results available yet. Try running a scan.
        </p>
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
                  <td
                    style={{ maxWidth: "600px", whiteSpace: "pre-wrap" }}
                  >
                    <div
                      style={{ maxHeight: "300px", overflowY: "auto" }}
                    >
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
