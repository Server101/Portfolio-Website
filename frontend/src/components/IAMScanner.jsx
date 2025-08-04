// src/components/IAMScanner.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const IAMScanner = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const normalizeResult = (data) =>
    data
      .filter(item => item && item.roleName && item.analysis)
      .map((item, idx) => ({
        id: item.id ?? idx,
        roleName: item.roleName ?? "Unknown",
        score: item.score ?? 0,
        analysis: item.analysis ?? "No analysis available.",
        createdAt: item.createdAt ?? new Date().toISOString(),
      }));

  useEffect(() => {
    console.log("✅ IAMScanner mounted");
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/iam/logs");
      console.log("📄 Logs API response:", res.data);
      const normalized = normalizeResult(res.data.logs || []);
      setResults(normalized);
    } catch (err) {
      console.error("❌ Error fetching logs:", err);
      setError("❌ Failed to load IAM scan logs.");
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
      console.log("🚀 Scan API response:", res.data);

      if (
        res.data &&
        res.data.success &&
        Array.isArray(res.data.results)
      ) {
        const normalized = normalizeResult(res.data.results);
        console.log("✅ Normalized Results:", normalized);

        setResults(normalized);

        if (normalized.length > 0) {
          setMessage(`✅ Scan complete — ${normalized.length} role(s) analyzed.`);
        } else {
          setMessage("✅ Scan complete. No misconfigurations detected — great job!");
        }
      } else {
        setError("⚠️ Scan completed but no usable results returned.");
        setResults([]);
      }
    } catch (err) {
      console.error("❌ Scan error:", err);
      setError("❌ Scan failed. Check backend logs.");
    } finally {
      setTimeout(() => setScanning(false), 2000);
    }
  };

  const handleExport = (format) => {
    if (!results.length) return;
    const filename = `iam_scan_${new Date().toISOString().slice(0, 10)}`;
    let content, mimeType;

    if (format === "json") {
      content = JSON.stringify(results, null, 2);
      mimeType = "application/json";
    } else {
      const header = Object.keys(results[0]).join(",");
      const rows = results.map((r) =>
        Object.values(r)
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
    link.click();
  };

  return (
    <div className="iam-results mt-4">
      <h5>Gemini-Powered IAM Misconfiguration Detector</h5>
      <p className="text-muted small">
        This tool scans IAM trust policies using Gemini AI and flags risky configurations like wildcard permissions, missing MFA, and publicly accessible roles.
      </p>
<p style={{ color: 'red' }}>🔥 Debug: This is the live IAMScanner</p>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <button
        className="btn btn-primary mb-3 me-2"
        onClick={runScan}
        disabled={scanning}
      >
        {scanning ? "🔄 Scanning..." : "🔍 Run New Scan"}
      </button>

      {results.length > 0 && (
        <>
          <button
            className="btn btn-outline-secondary mb-3 me-2"
            onClick={() => handleExport("json")}
          >
            ⬇️ Export JSON
          </button>
          <button
            className="btn btn-outline-secondary mb-3"
            onClick={() => handleExport("csv")}
          >
            ⬇️ Export CSV
          </button>
        </>
      )}

      {loading || scanning ? (
        <p>Loading IAM scan results...</p>
      ) : results.length === 0 ? (
        <p className="text-muted">No scan results yet. Try running a scan.</p>
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
              {results.map((r) => (
                <tr
                  key={r.id}
                  className={
                    r.score >= 90
                      ? "table-danger"
                      : r.score >= 70
                      ? "table-warning"
                      : "table-success"
                  }
                >
                  <td>{r.roleName}</td>
                  <td>{r.score}</td>
                  <td>{new Date(r.createdAt).toLocaleString()}</td>
                  <td style={{ maxWidth: "600px", whiteSpace: "pre-wrap" }}>
                    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                      {r.analysis}
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
