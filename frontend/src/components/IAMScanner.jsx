import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

function normalizeResults(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.logs)) return data.logs;
  return [];
}

function normalizeRow(row) {
  return {
    roleName: row.roleName || row.role_name || "Unknown role",
    score: Number(row.score || 0),
    createdAt: row.createdAt || row.created_at,
    analysis: row.analysis || "No analysis available.",
  };
}

export default function IAMScanner() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await apiClient.get("/api/iam/logs");
      setResults(normalizeResults(data).map(normalizeRow));
      setCurrentPage(0);
    } catch (err) {
      setError("Failed to load IAM scan logs.");
    } finally {
      setLoading(false);
    }
  };

  const runScan = async () => {
    if (scanning) return;

    try {
      setScanning(true);
      setError("");
      setMessage("");
      const { data } = await apiClient.get("/api/iam/scan");
      const list = normalizeResults(data).map(normalizeRow);

      if (data?.success === false && list.length === 0) {
        setError("Scan completed, but no usable results were returned.");
        return;
      }

      setResults(list);
      setCurrentPage(0);
      setMessage(list.length ? `New scan complete: ${list.length} role(s) analyzed.` : "IAM scan complete. No misconfigurations detected.");
    } catch (err) {
      setError(err?.response?.data?.error || "Scan failed. Check the backend logs on EC2.");
    } finally {
      setScanning(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const total = results.length;
  const current = results[currentPage] || null;

  return (
    <div className="feature-console">
      <div className="feature-toolbar">
        <div>
          <strong>Latest IAM Scans</strong>
          <span>{total ? `${currentPage + 1} of ${total}` : "No results yet"}</span>
        </div>
        <button className="secondary-button" type="button" onClick={runScan} disabled={scanning}>
          {scanning ? "Scanning..." : "Run New Scan"}
        </button>
      </div>

      {error && <div className="form-error compact">{error}</div>}
      {message && <div className="form-success compact">{message}</div>}

      {loading || scanning ? (
        <p className="muted-copy">Loading IAM scan results...</p>
      ) : total === 0 ? (
        <p className="muted-copy">No scan results available yet. Run a scan to review IAM trust policies.</p>
      ) : (
        <>
          <div className="pager-row">
            <button type="button" onClick={() => setCurrentPage((page) => Math.max(page - 1, 0))} disabled={currentPage === 0}>
              Previous
            </button>
            <button type="button" onClick={() => setCurrentPage((page) => Math.min(page + 1, total - 1))} disabled={currentPage === total - 1}>
              Next
            </button>
          </div>

          <div className="result-card">
            <div className="result-card-header">
              <span>{current.roleName}</span>
              <strong className={current.score >= 90 ? "risk-high" : current.score >= 70 ? "risk-medium" : "risk-low"}>
                Score {current.score}
              </strong>
            </div>
            <small>{current.createdAt ? new Date(current.createdAt).toLocaleString() : "No timestamp"}</small>
            <pre>{current.analysis}</pre>
          </div>
        </>
      )}
    </div>
  );
}
