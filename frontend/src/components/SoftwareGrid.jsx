// src/components/SoftwareGrid.jsx
import React, { useEffect, useState } from "react";

const API_BASE = "https://api.github.com";

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
  return { display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: color, marginRight: 6, verticalAlign: "middle" };
}

function oneLine(str = "") {
  const firstPeriod = str.indexOf(".");
  let s = firstPeriod > 0 ? str.slice(0, firstPeriod + 1) : str;
  if (s.length > 180) s = s.slice(0, 177) + "…";
  return s.replace(/\s+/g, " ").trim();
}

export default function SoftwareGrid({ repos = [] }) {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const results = await Promise.allSettled(
          repos.map(({ slug }) =>
            fetch(`${API_BASE}/repos/${slug}`).then((r) => {
              if (!r.ok) throw new Error(`GitHub ${r.status} for ${slug}`);
              return r.json();
            })
          )
        );
        if (cancelled) return;
        const ok = results.filter(r => r.status === "fulfilled" && r.value).map(r => r.value);
        const mapped = ok.map(r => ({
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
        if (mapped.length === 0) setErr("No repositories to display right now.");
      } catch (e) {
        console.error(e);
        if (!cancelled) setErr("No repositories to display right now.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [repos]);

// SoftwareGrid.jsx
// Begining of code block to stop repos from
const slugsKey = React.useMemo(
  () => repos.map(r => r.slug).sort().join("|"),
  [repos]
);

useEffect(() => {
  let cancelled = false;
  const controller = new AbortController();

  (async () => {
    setLoading(true);
    setErr("");
    try {
      const results = await Promise.allSettled(
        repos.map(({ slug }) =>
          fetch(`https://api.github.com/repos/${slug}`, { signal: controller.signal })
            .then(r => {
              if (!r.ok) throw new Error(`GitHub ${r.status} for ${slug}`);
              return r.json();
            })
        )
      );
      if (cancelled) return;
      const ok = results.filter(r => r.status === "fulfilled").map(r => r.value);
      const mapped = ok.map(r => ({
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
      if (mapped.length === 0) setErr("No repositories to display right now.");
    } catch (e) {
      if (!cancelled) setErr("No repositories to display right now.");
    } finally {
      if (!cancelled) setLoading(false);
    }
  })();

  return () => { cancelled = true; controller.abort(); };
}, [slugsKey, repos]);
// End Of Code Block



  if (loading) {
    return (
      <div className="text-center my-3">
        <div className="spinner-border" role="status" />
        <div className="mt-2 small text-muted">Fetching repositories…</div>
      </div>
    );
  }
  if (err && items.length === 0) return <div className="alert alert-warning">{err}</div>;

  return (
    // No inner box here — stretches to parent width
    <div className="w-100">
      <style>{`
        .software-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.25rem;
          align-items: stretch;
        }
        @media (max-width: 575.98px) {
          .software-grid { grid-template-columns: 1fr; }
        }
        .repo-item { height: 100%; }
        .repo-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 1rem;
          border-radius: .5rem;
          box-shadow: 0 .125rem .25rem rgba(0,0,0,.075);
          background: #fff;
          text-align: left;
        }
        .repo-desc {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .repo-card .card-footer { margin-top: auto; }
        .repo-link { text-decoration: none; }
        .repo-link:hover { text-decoration: underline; }
      `}</style>

      <div className="software-grid">
        {items.map((repo) => {
          const color = LANG_COLORS[repo.language] || "#888";
          const icon = LANG_ICONS[repo.language] || "📦";
          return (
            <div key={repo.id} className="repo-item">
              <div className="repo-card">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer" className="fw-semibold repo-link" title={repo.fullName}>
                    {repo.fullName}
                  </a>
                  <span className="badge bg-secondary-subtle text-dark border">Software</span>
                </div>

                {repo.description && <div className="text-muted repo-desc mb-2">{repo.description}</div>}

                <div className="d-flex align-items-center flex-wrap gap-3 small">
                  <span className="d-inline-flex align-items-center" style={{ color }}>
                    <span style={dotStyle(color)} />
                    <span className="me-1">{icon}</span>
                    <span>{repo.language || "Unknown"}</span>
                  </span>
                  <span title="Stars">⭐ {repo.stars}</span>
                  <span title="Forks">🍴 {repo.forks}</span>
                  <span className="text-muted">Updated {new Date(repo.updatedAt).toLocaleDateString()}</span>
                </div>

                <div className="card-footer mt-3">
                  <a className="btn btn-sm btn-outline-dark w-auto" href={repo.htmlUrl} target="_blank" rel="noopener noreferrer">
                    View Repo
                  </a>
                </div>
              </div>
            </div>
          );
        })}

        {err && items.length > 0 && (
          <div className="repo-item" style={{ gridColumn: "1 / -1" }}>
            <div className="alert alert-secondary small mb-0">Note: Some repositories couldn’t be loaded.</div>
          </div>
        )}
      </div>
    </div>
  );
}
