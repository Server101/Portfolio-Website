import React, { useEffect, useMemo, useState } from "react";
import apiClient from "../services/apiClient";

const demoThreatLogs = [
  {
    websiteUrl: "https://secure-login-verify.example",
    threatLevel: "Medium",
    description: "Demo signal: credential lure pattern detected by local heuristics.",
    score: 40,
    flags: ["credential lure pattern"],
    detectedAt: new Date().toISOString(),
  },
  {
    websiteUrl: "https://ricardotech.com",
    threatLevel: "Low",
    description: "Demo signal: no high-confidence threat indicators were found.",
    score: 0,
    flags: [],
    detectedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
];

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
  const ipPattern = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

  if (ipPattern.test(trimmed)) return true;

  try {
    const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const parsed = new URL(candidate);
    return parsed.hostname.includes(".") && parsed.hostname.length > 3;
  } catch {
    return false;
  }
}

export default function ThreatDashboard() {
  const [url, setUrl] = useState("");
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [logsLoading, setLogsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const logsPerPage = 3;

  const fetchLogs = async (level = filter) => {
    setLogsLoading(true);
    setError("");
    setWarning("");

    try {
      const path = level ? `/api/threat?threatLevel=${encodeURIComponent(level)}` : "/api/threat";
      const { data } = await apiClient.get(path);
      const normalized = normalizeList(data);
      setLogs(normalized);
      setCurrentPage(1);

      if (data?.storage?.available === false) {
        setWarning("Threat API is live. Database storage is temporarily unavailable, so fallback results are displayed.");
      }
    } catch (err) {
      const fallbackLogs = level ? demoThreatLogs.filter((item) => item.threatLevel === level) : demoThreatLogs;
      setLogs(fallbackLogs);
      setCurrentPage(1);
      setWarning("Live threat logs are temporarily unavailable. Public-safe demo results are displayed.");
    } finally {
      setLogsLoading(false);
    }
  };

  const analyzeUrl = async (event) => {
    event.preventDefault();
    setError("");
    setWarning("");

    if (!validateUrlOrIp(url)) {
      setError("Please enter a valid website URL or IPv4 address.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await apiClient.post("/api/threat/analyze", { websiteUrl: url.trim() });
      const created = normalizeList([data?.result]).filter((item) => item.websiteUrl);
      setUrl("");

      if (created.length) {
        setLogs((currentLogs) => [...created, ...currentLogs].slice(0, 50));
        setCurrentPage(1);
      } else {
        await fetchLogs(filter);
      }

      if (data?.storage?.available === false || data?.result?.saved === false) {
        setWarning("Analysis completed. Database storage is temporarily unavailable, so this result is shown in memory only.");
      }
    } catch (err) {
      setError(err?.response?.data?.error || "Threat analysis is temporarily unavailable. Please try again after the backend is redeployed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs("");
  }, []);

  const filteredLogs = useMemo(() => {
    if (!filter) return logs;
    return logs.filter((log) => log.threatLevel === filter);
  }, [filter, logs]);

  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / logsPerPage));
  const currentLogs = filteredLogs.slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage);

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
            const nextFilter = event.target.value;
            setFilter(nextFilter);
            setCurrentPage(1);
            fetchLogs(nextFilter);
          }}
        >
          <option value="">All Threat Levels</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <span>{logsLoading ? "Loading logs..." : `${filteredLogs.length} log(s)`}</span>
      </div>

      {error && <div className="form-error compact">{error}</div>}
      {warning && <div className="form-warning compact">{warning}</div>}

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
                    <td>{log.flags.length ? log.flags.join(", ") : "—"}</td>
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
