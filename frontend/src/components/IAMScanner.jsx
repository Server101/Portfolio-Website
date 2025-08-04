// src/components/IAMScanner.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const IAMScanner = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Normalize API fields from snake_case to camelCase
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
    const res = await axios.get("/api/iam/logs");
    console.log("📦 Logs returned:", res.data); // <-- Add this line
    setResults(res.data.results || []); // <-- Make sure it's 'results', not 'logs'
  } catch (err) {
    console.error("❌ Failed to load IAM scan logs:", err);
    setError("Failed to load IAM scan logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const runScan = async () => {
    if (scanning) return;
    try {
      setScanning(true);
      setMessage("");
      setError("");

      const res = await axios.get("/api/iam/scan");
      console.log("🚀 Scan response:", res.data);

      if (res.data?.success && Array.isArray(res.data.results)) {
        const normalized = normalizeResult(res.data.results);
        setResults(normalized);

        if (normalized.length > 0) {
          setMessage(`✅ IAM scan completed. ${normalized.length} roles analyzed.`);
        } else {
          setMessage("✅ IAM scan completed. No issues detected.");
        }
      } else {
        setError("⚠️ Scan completed but no usable results returned.");
      }
    } catch (err) {
      console.error("❌ Scan failed:", err);
      setError("❌ Scan failed. Check backend logs.");
    } finally {
      setTimeout(() => setScanning(false), 1500);
    }
  };

  const handleExport = (format) => {
    if (!results.length) return;

    const filename = `iam_scan_results_${new Date().toISOString().slice(0, 10)}`;
    let content = "", mimeType = "";

    if (format === "json") {
      content = JSON.stringify(results, null, 2);
      mimeType = "application/json";
    } else if (format === "csv") {
      const header = Object.keys(results[0]).join(",");
      const rows = results.map(obj =>
        Object.values(obj)
          .map(val => `"${String(val).replace(/"/g, '""')}"`)
          .join(",")
      );
      content = [header, ...rows].join("\n");
      mimeType = "text/csv";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
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
                    <div style={{ maxHeight: "300px", overflowY: "auto" }}>{row.analysis}</div>
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
