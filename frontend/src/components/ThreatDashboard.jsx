import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

function normalizeFlags(flags) {
  if (Array.isArray(flags)) return flags;
  try {
    return JSON.parse(flags || "[]");
  } catch {
    return [];
  }
}

function normalizeList(data) {
  const list = Array.isArray(data) ? data : data?.results || [];
  return list.map((row) => ({
    websiteUrl: row.websiteUrl || row.website_url,
    threatLevel: row.threatLevel || row.threat_level || "Low",
    description: row.description || "No description available.",
    score: Number(row.score || 0),
    flags: normalizeFlags(row.flags),
    detectedAt: row.detectedAt || row.detected_at,
  }));
}

function validateUrlOrIp(input) {
  const trimmed = input.trim();
  const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
  const ipPattern = /^\d{1,3}(\.\d{1,3}){3}$/;
  return urlPattern.test(trimmed) || ipPattern.test(trimmed);
}

export default function ThreatDashboard() {
  const [url, setUrl] = useState("");
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [logsLoading, setLogsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const logsPerPage = 3;

  const fetchLogs = async (level = filter) => {
    setLogsLoading(true);
    setError("");

    try {
      const path = level ? `/api/threat?threatLevel=${encodeURIComponent(level)}` : "/api/threat";
      const { data } = await apiClient.get(path);
      setLogs(normalizeList(data));
      setCurrentPage(1);
    } catch (err) {
      setError("Failed to fetch threat logs.");
    } finally {
      setLogsLoading(false);
    }
  };

  const analyzeUrl = async (event) => {
    event.preventDefault();
    setError("");

    if (!validateUrlOrIp(url)) {
      setError("Please enter a valid website URL or IP address.");
      return;
    }

    try {
      setLoading(true);
      await apiClient.post("/api/threat/analyze", { websiteUrl: url.trim() });
      setUrl("");
      await fetchLogs(filter);
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to analyze the URL.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs("");
  }, []);

  const totalPages = Math.max(1, Math.ceil(logs.length / logsPerPage));
  const currentLogs = logs.slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage);

  return (
    <div className="feature-console">
      <form className="scan-form" onSubmit={analyzeUrl}>
        <input
          type="text"
          placeholder="Enter URL or IP address"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <button className="secondary-button" type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      <div className="feature-toolbar compact-toolbar">
        <select
          value={filter}
          onChange={(event) => {
            setFilter(event.target.value);
            fetchLogs(event.target.value);
          }}
        >
          <option value="">All Threat Levels</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <span>{logsLoading ? "Loading logs..." : `${logs.length} log(s)`}</span>
      </div>

      {error && <div className="form-error compact">{error}</div>}

      {currentLogs.length === 0 ? (
        <p className="muted-copy">No threat logs available yet.</p>
      ) : (
        <>
          <div className="table-shell">
            <table>
              <thead>
                <tr>
                  <th>Website</th>
                  <th>Level</th>
                  <th>Description</th>
                  <th>Score</th>
                  <th>Flags</th>
                  <th>Detected</th>
                </tr>
              </thead>
              <tbody>
                {currentLogs.map((log, index) => (
                  <tr key={`${log.websiteUrl}-${log.detectedAt || index}`}>
                    <td>{log.websiteUrl}</td>
                    <td><span className={`status-pill ${log.threatLevel.toLowerCase()}`}>{log.threatLevel}</span></td>
                    <td>{log.description}</td>
                    <td>{log.score}</td>
                    <td>{log.flags.join(", ")}</td>
                    <td>{log.detectedAt ? new Date(log.detectedAt).toLocaleString() : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pager-row">
            <button type="button" onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))} disabled={currentPage === 1}>Prev</button>
            <span>{currentPage} / {totalPages}</span>
            <button type="button" onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}
