import React, { useEffect, useState } from "react";
import axios from "axios";

const IAMScanner = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");

  // Fetch IAM scan results
  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/iam/logs");
      console.log("✅ Raw response from backend:", res.data);
      console.log("✅ Loaded scan results:", res.data.results);
      setResults(res.data.results || []);
    } catch (err) {
      console.error("❌ Failed to fetch logs:", err);
      setError("Failed to load IAM scan logs.");
    } finally {
      setLoading(false);
    }
  };

  // Log results whenever they update
  useEffect(() => {
    console.log("🔍 Results updated:", results);
  }, [results]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const runScan = async () => {
    try {
      setScanning(true);
      const res = await axios.get("/api/iam/scan");
      if (res.data?.success) {
        console.log("✅ Scan triggered successfully:", res.data);
        await fetchLogs(); // Refresh table with new results
      } else {
        setError("Scan failed or returned no results.");
      }
    } catch (err) {
      setError("Scan failed. Check server logs.");
      console.error("❌ Scan error:", err);
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
