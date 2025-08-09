import React, { useEffect, useState } from "react";
import axios from "axios";

// Accepts either "owner/repo" or full URL "https://github.com/owner/repo"
function parseSlug(input) {
  if (!input) return [null, null];
  if (input.includes("github.com")) {
    try {
      const url = new URL(input);
      const [owner, repo] = url.pathname.replace(/^\/+/, "").split("/");
      return [owner, repo];
    } catch {
      return [null, null];
    }
  }
  const parts = input.split("/");
  if (parts.length === 2) return [parts[0], parts[1]];
  return [null, null];
}

export default function SoftwareGrid({
  repos = [] // ← we now expect you to pass repos from Home.jsx
}) {
  const token = process.env.REACT_APP_GITHUB_TOKEN || "";
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setErr("");

        if (!repos.length) {
          setErr("No repositories configured. Pass a repos prop to <SoftwareGrid />.");
          setLoading(false);
          return;
        }

        const headers = token
          ? { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" }
          : { Accept: "application/vnd.github+json" };

        const requests = repos.map(async (r) => {
          const [owner, repo] = parseSlug(r.slug);
          if (!owner || !repo) {
            throw new Error(`Invalid repo slug: "${r.slug}". Use "Owner/Repo".`);
          }
          const { data } = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}`,
            { headers }
          );

          return {
            id: r.id || `${owner}/${repo}`,
            name: data.full_name,
            repoName: data.name,
            html_url: data.html_url,
            desc: data.description || "—",
            language: data.language || "Unknown",
            stars: data.stargazers_count ?? 0,
            forks: data.forks_count ?? 0,
            avatar: data.owner?.avatar_url || "",
            badge: r.badge || "Project",
          };
        });

        const out = await Promise.all(requests);
        if (mounted) setCards(out);
      } catch (e) {
        console.error("GitHub fetch failed:", e?.response?.data || e.message || e);
        const status = e?.response?.status;
        if (status === 403) {
          setErr("GitHub rate limit hit. Add REACT_APP_GITHUB_TOKEN and rebuild.");
        } else if (status === 404) {
          setErr("One or more repositories were not found. Check owner/repo names.");
        } else {
          setErr("Couldn’t load GitHub repositories (network or config issue).");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [repos, token]);

  return (
    <div className="tm-page-content-width">
      <div className="tm-translucent-white-bg tm-textbox tm-content-box tm-textbox-full-height p-4 rounded shadow">
        <h2 className="tm-section-title tm-blue-text mb-3">Software</h2>
        <p className="mb-4">Open-source projects and tools.</p>

        {err && <div className="alert alert-warning">{err}</div>}
        {loading && <p>Loading repositories…</p>}

        {!loading && !err && (
          <div className="row">
            {cards.map((c) => (
              <div className="col-md-6 mb-3" key={c.id}>
                <a
                  href={c.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-2">
                        {c.avatar ? (
                          <img
                            src={c.avatar}
                            alt="owner"
                            width="28"
                            height="28"
                            className="rounded me-2"
                          />
                        ) : null}
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center gap-2">
                            <strong className="me-2">{c.name}</strong>
                            <span className="badge bg-secondary">{c.badge}</span>
                          </div>
                        </div>
                      </div>

                      <p className="mb-3" style={{ color: "black" }}>{c.desc}</p>

                      <div className="d-flex align-items-center gap-3 small text-muted">
                        <span>● {c.language}</span>
                        <span>★ {c.stars}</span>
                        <span>⑂ {c.forks}</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
