import React, { useEffect, useState } from "react";
import axios from "axios";

const IAMScanner = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Ensure we handle both camelCase and snake_case
  const normalizeResult = (data) =>
    data.map((item, idx) => ({
      id: item.id ?? idx,
      roleName: item.roleName ?? item.role_name ?? "Unknown",
      score: item.score ?? 0,
      analysis: item.analysis ?? "No analysis provided",
      createdAt: item.createdAt ?? item.created_at ?? new Date().toISOString(),
    }));

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/iam/logs");
      const normalized = normalizeResult(res.data.logs || []);
      console.log("✅ Loaded IAM logs:", normalized);
      setResults(normalized);
    } catch (err) {
      console.error("❌ Log load error:", err);
      setError("Failed to load IAM scan logs.");
    } finally {
      setLoading(false);
    }
  };

  const runScan = async () => {
    if (scanning) return;
    try {
      setError("");
      setMessage("");
      setScanning(true);

      const res = await axios.get("/api/iam/scan");
      const normalized = normalizeResult(res.data.results || []);
      console.log("✅ New scan results:", normalized);

      setResults(normalized);

      if (normalized.length > 0) {
        setMessage(`✅ Scan completed. ${normalized.length} IAM role(s) analyzed.`);
      } else {
        setError("⚠️ Scan completed but no usable results returned.");
      }
    } catch (err) {
      console.error("❌ Scan error:", err);
      setError("❌ Scan failed. Check backend logs.");
    } finally {
      setTimeout(() => setScanning(false), 1500);
    }
  };

  return (
    <div className="iam-results mt-4">
      <h5>Latest IAM Scans:</h5>
      <p className="text-muted small">
        This tool inspects IAM roles in your AWS account and flags risky trust policies using Gemini AI.
      </p>

      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <button className="btn btn-primary mb-3 me-2" onClick={runScan} disabled={scanning}>
        {scanning ? "🔄 Scanning..." : "🔍 Run New Scan"}
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
