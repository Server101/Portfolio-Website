// src/components/SoftwareGrid.jsx
import React, { useEffect, useState } from "react";

const API_BASE = "https://api.github.com";

// Language → color map (includes SCSS)
const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  HTML: "#e34c26",
  Shell: "#89e051",
  Java: "#b07219",
  Go: "#00ADD8",
  PHP: "#4F5D95",
  Ruby: "#701516",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Rust: "#dea584",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
};

// Tiny emoji “icons”
const LANG_ICONS = {
  JavaScript: "⚡",
  TypeScript: "🧩",
  Python: "🐍",
  CSS: "🎨",
  SCSS: "💗",
  HTML: "🔶",
  Shell: "🖥️",
  Java: "☕",
  Go: "🌀",
  PHP: "🐘",
  Ruby: "💎",
  C: "🔷",
  "C++": "🔺",
  "C#": "♯",
  Rust: "🦀",
  Kotlin: "🧪",
  Swift: "🕊️",
};

function dotStyle(color) {
  return {
    display: "inline-block",
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: color,
    marginRight: 6,
    verticalAlign: "middle",
  };
}

function oneLine(str = "") {
  const firstPeriod = str.indexOf(".");
  let s = firstPeriod > 0 ? str.slice(0, firstPeriod + 1) : str;
  if (s.length > 120) s = s.slice(0, 117) + "…";
  return s.replace(/\s+/g, " ").trim();
}

export default function SoftwareGrid({
  repos = [
    // Example:
    // { id: "iam", slug: "Server101/iam-misconfig-detector" },
    // { id: "threat", slug: "Server101/threat-dashboard" },
  ],
}) {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErr("");

      try {
        // Fetch all repos, but don't fail the whole list if one breaks
        const results = await Promise.allSettled(
          repos.map(({ slug }) =>
            fetch(`${API_BASE}/repos/${slug}`).then((r) => {
              if (!r.ok) throw new Error(`GitHub ${r.status} for ${slug}`);
              return r.json();
            })
          )
        );

        if (cancelled) return;

        const ok = results
          .filter((r) => r.status === "fulfilled" && r.value)
          .map((r) => r.value);

        // Map to UI shape
        const mapped = ok.map((r) => ({
          id: r.id,
          name: r.name,
          fullName: r.full_name,
          htmlUrl: r.html_url,
          description: oneLine(r.description || ""),
          language: r.language,
          stars: r.stargazers_count,
          forks: r.forks_count,
          updatedAt: r.updated_at,
        }));

        setItems(mapped);

        // Only show an error if **all** failed
        if (mapped.length === 0) {
          setErr("No repositories to display right now.");
        }
      } catch (e) {
        console.error("GitHub fetch failed:", e);
        if (!cancelled) setErr("No repositories to display right now.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [repos]);

  if (loading) {
    return (
      <div className="text-center my-3">
        <div className="spinner-border" role="status" />
        <div className="mt-2 small text-muted">Fetching repositories…</div>
      </div>
    );
  }

  if (err && items.length === 0) {
    return <div className="alert alert-warning">{err}</div>;
  }

  return (
    <div
      className="software-wrap mx-auto px-2"
      style={{ maxWidth: 1200 }} // centered + a bit wider
    >
      <div className="row gx-5 gy-4 justify-content-center">
        {items.map((repo) => {
          const color = LANG_COLORS[repo.language] || "#888";
          const icon = LANG_ICONS[repo.language] || "📦";

          return (
            <div key={repo.id} className="col-12 col-md-6">
              <div className="repo-card h-100 shadow-sm rounded p-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <a
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fw-semibold repo-link"
                    title={repo.fullName}
                  >
                    {repo.fullName}
                  </a>
                  <span className="badge bg-secondary-subtle text-dark border">
                    Software
                  </span>
                </div>

                {/* one-line description */}
                {repo.description && (
                  <div className="text-muted one-line mb-2">{repo.description}</div>
                )}

                <div className="d-flex align-items-center flex-wrap gap-3 small">
                  <span className="d-inline-flex align-items-center" style={{ color }}>
                    <span style={dotStyle(color)} />
                    <span className="me-1">{icon}</span>
                    <span>{repo.language || "Unknown"}</span>
                  </span>
                  <span title="Stars">⭐ {repo.stars}</span>
                  <span title="Forks">🍴 {repo.forks}</span>
                  <span className="text-muted">
                    Updated {new Date(repo.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="mt-3">
                  <a
                    className="btn btn-sm btn-outline-dark"
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Repo
                  </a>
                </div>
              </div>
            </div>
          );
        })}

        {/* If some failed, gently notify but still show successes */}
        {err && items.length > 0 && (
          <div className="col-12">
            <div className="alert alert-secondary small mb-0">
              Note: Some repositories couldn’t be loaded.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
