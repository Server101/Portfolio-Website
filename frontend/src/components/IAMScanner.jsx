// src/components/IAMScanner.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const IAMScanner = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Normalize API response keys to camelCase
  const normalizeResult = (data) =>
    data.map((item, idx) => ({
      id: item.id ?? idx,
      roleName: item.role_name ?? "Unknown",
      score: item.score ?? 0,
      analysis: item.analysis ?? "No analysis available.",
      createdAt: item.created_at ?? new Date().toISOString(),
    }));

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/iam/logs");
      const normalized = normalizeResult(res.data.logs || []);
      setResults(normalized);
      setMessage(`✅ Loaded ${normalized.length} IAM scans.`);
    } catch (err) {
      console.error("❌ Failed to fetch logs:", err);
      setError("❌ Failed to load IAM scan logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const runScan = async () => {
    if (scanning) return;
    setScanning(true);
    setError("");
    setMessage("");
    try {
      const res = await axios.get("/api/iam/scan");
      if (res.data?.success && Array.isArray(res.data.results)) {
        await fetchLogs();
        setMessage(`✅ IAM scan completed. ${res.data.results.length} role(s) analyzed.`);
      } else {
        setError("⚠️ Scan completed but no usable results returned.");
      }
    } catch (err) {
      console.error("❌ Scan error:", err);
      setError("❌ Scan failed. Check backend logs.");
    } finally {
      setScanning(false);
    }
  };

  const handleExport = (format) => {
    const filename = `iam_scan_results_${new Date().toISOString().slice(0, 10)}`;
    let content, mimeType;

    if (format === "json") {
      content = JSON.stringify(results, null, 2);
      mimeType = "application/json";
    } else if (format === "csv") {
      const header = Object.keys(results[0]).join(",");
      const rows = results.map((obj) =>
        Object.values(obj)
          .map((val) => `"${String(val).replace(/"/g, '""')}"`)
          .join(",")
      );
      content = [header, ...rows].join("\n");
      mimeType = "text/csv";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

      {results.length > 0 && (
        <>
          <button className="btn btn-outline-secondary mb-3 me-2" onClick={() => handleExport("json")}>
            ⬇️ Export JSON
          </button>
          <button className="btn btn-outline-secondary mb-3" onClick={() => handleExport("csv")}>
            ⬇️ Export CSV
          </button>
        </>
      )}

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
