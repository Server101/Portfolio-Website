import React, { useEffect, useState } from "react";
import axios from "axios";

const IAMScanner = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Pagination state
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch IAM scan results
  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/iam/logs");
      setResults(res.data.results || []);
      setCurrentIndex(0);
    } catch (err) {
      console.error("❌ Failed to fetch logs:", err);
      setError("Failed to load IAM scan logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // Trigger a new scan and refresh
  const runScan = async () => {
    if (scanning) return;
    try {
      setScanning(true);
      setError("");
      setMessage("");
      const { data } = await axios.get("/api/iam/scan");
      if (data.success && Array.isArray(data.results)) {
        setResults(data.results);
        setCurrentIndex(0);
        setMessage(`✅ New scan complete: ${data.results.length} role(s) analyzed.`);
      } else {
        setError("⚠️ Scan completed but no usable results returned.");
      }
    } catch (err) {
      console.error("❌ Scan error:", err);
      setError("❌ Scan failed. Check server logs.");
    } finally {
      setScanning(false);
    }
  };

  const prev = () => setCurrentIndex(idx => Math.max(0, idx - 1));
  const next = () => setCurrentIndex(idx => Math.min(results.length - 1, idx + 1));

  const current = results[currentIndex];

  return (
    <div className="iam-results mt-4">
      <h5>Latest IAM Scans:</h5>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <button className="btn btn-primary mb-3 me-2" onClick={runScan} disabled={scanning}>
        {scanning ? "🔄 Scanning AWS IAM..." : "🔍 Run New Scan"}
      </button>

      {(loading || scanning) ? (
        <p>Loading IAM scan results...</p>
      ) : results.length === 0 ? (
        <p className="text-muted">No scan results available yet. Try running a scan.</p>
      ) : (
        <>
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
                <tr className={
                    current.score >= 90 ? "table-danger" :
                    current.score >= 70 ? "table-warning" :
                    "table-success"
                  }>
                  <td>{current.roleName}</td>
                  <td>{current.score}</td>
                  <td>{new Date(current.createdAt).toLocaleString()}</td>
                  <td style={{ maxWidth: "600px", whiteSpace: "pre-wrap" }}>
                    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                      {current.analysis}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-secondary" onClick={prev} disabled={currentIndex === 0}>
              ← Previous
            </button>
            <span> {currentIndex + 1} of {results.length} </span>
            <button className="btn btn-secondary" onClick={next} disabled={currentIndex === results.length - 1}>
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default IAMScanner;
