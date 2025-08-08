// src/components/IAMScanner.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

// 🚫 Do NOT hardcode your API base in production behind Nginx.
// If you need it for local dev, set REACT_APP_API_URL exactly (e.g. http://localhost:3001)
const API_BASE = (process.env.REACT_APP_API_URL || "").replace(/\/+$/, "");

const apiGet = (path) => axios.get(`${API_BASE}${path}`);

// Normalize various backend shapes into an array
const normalizeResults = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.logs)) return data.logs;
  return [];
};

const IAMScanner = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  // Fetch IAM scan results
  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await apiGet("/api/iam/logs");
      console.log("IAM /logs ->", res.data);
      const list = normalizeResults(res.data);
      setResults(list);
      setCurrentPage(0);
    } catch (err) {
      console.error("Failed to fetch logs:", err);
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

      const { data } = await apiGet("/api/iam/scan");
      console.log("IAM /scan ->", data);

      const list = normalizeResults(data);

      // Treat “success: false” as failure only if we also have no list
      if (data?.success === false && list.length === 0) {
        setError("⚠️ Scan completed but no usable results returned.");
        return;
      }

      setResults(list);
      setCurrentPage(0);

      setMessage(
        list.length > 0
          ? `✅ New scan complete: ${list.length} role(s) analyzed.`
          : "✅ IAM scan complete. No misconfigurations detected — great job!"
      );
    } catch (err) {
      console.error("Scan error:", err);
      setError("❌ Scan failed. Check server logs.");
    } finally {
      setScanning(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const total = results.length;
  const current = results[currentPage] || null;

  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 0));
  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, total - 1));

  return (
    <div className="iam-results mt-4">
      <h5>Latest IAM Scans:</h5>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <button
        className="btn btn-primary mb-3 me-2"
        onClick={runScan}
        disabled={scanning}
      >
        {scanning ? "🔄 Scanning AWS IAM..." : "🔍 Run New Scan"}
      </button>

      {loading || scanning ? (
        <p>Loading IAM scan results...</p>
      ) : total === 0 ? (
        <p className="text-muted">No scan results available yet. Try running a scan.</p>
      ) : (
        <>
          <div className="d-flex align-items-center mb-2">
            <button
              className="btn btn-sm btn-outline-secondary me-2"
              style={{ backgroundColor: "#fff", color: "#000" }}
              onClick={prevPage}
              disabled={currentPage === 0}
            >
              ◀ Previous
            </button>
            <span>Result {currentPage + 1} of {total}</span>
            <button
              className="btn btn-sm btn-outline-secondary ms-2"
              style={{ backgroundColor: "#fff", color: "#000" }}
              onClick={nextPage}
              disabled={currentPage === total - 1}
            >
              Next ▶
            </button>
          </div>

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
                {current && (
                  <tr
                    className={
                      current.score >= 90
                        ? "table-danger"
                        : current.score >= 70
                        ? "table-warning"
                        : "table-success"
                    }
                  >
                    <td>{current.roleName}</td>
                    <td>{current.score}</td>
                    <td>{new Date(current.createdAt).toLocaleString()}</td>
                    <td style={{ maxWidth: "600px", whiteSpace: "pre-wrap" }}>
                      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                        {current.analysis}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default IAMScanner;
