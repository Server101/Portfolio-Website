// src/components/IAMScanner.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const IAMScanner = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch IAM scan logs (for initial load and manual refresh)
  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await axios.get("/api/iam/logs");
      console.log("✅ Raw /logs response:", data);
      setResults(Array.isArray(data.results) ? data.results : []);
    } catch (err) {
      console.error("❌ Failed to fetch logs:", err);
      setError("❌ Failed to load IAM scan logs.");
    } finally {
      setLoading(false);
    }
  };

  // On mount, load existing logs
  useEffect(() => {
    fetchLogs();
  }, []);

  // Trigger a new scan and use its results directly
const runScan = async () => {
    if (scanning) return;

    try {
      setScanning(true);
      setError("");
      setMessage("");

      const { data } = await axios.get("/api/iam/scan");
      console.log("🚀 /scan response payload:", data);

      // Make sure we grab whichever array the backend sent
      const scanResults = Array.isArray(data.results)
        ? data.results
        : Array.isArray(data.logs)
        ? data.logs
        : [];

      if (scanResults.length > 0) {
        setResults(scanResults);
        setMessage(`✅ New scan complete: ${scanResults.length} role(s) analyzed.`);
      } else if (data.success) {
        // we got a success flag but an empty array
        setResults([]);
        setMessage("✅ IAM scan complete. No misconfigurations detected — great job!");
      } else {
        // success was false or missing
        console.warn("⚠️ /scan returned un-expected payload:", data);
        setError("⚠️ Scan completed but no usable results returned.");
      }
    } catch (err) {
      console.error("❌ Scan error:", err);
      setError("❌ Scan failed. Check backend logs.");
    } finally {
      setScanning(false);
    }
  };

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
        <p className="text-muted">No scan results available yet. Try running a scan.</p>
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
                  <td style={{ maxWidth: "600px", whiteSpace: "pre-wrap" }}>
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
