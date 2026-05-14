import React, { useEffect, useMemo, useRef, useState } from "react";
import { softwareRepos } from "../data/portfolioContent";

const GITHUB_API = "https://api.github.com";

function oneLine(value = "") {
  const firstPeriod = value.indexOf(".");
  let text = firstPeriod > 0 ? value.slice(0, firstPeriod + 1) : value;
  if (text.length > 180) text = `${text.slice(0, 177)}...`;
  return text.replace(/\s+/g, " ").trim();
}

function fallbackRepo(repo) {
  const name = repo.slug.split("/").pop();
  return {
    id: repo.id,
    name,
    fullName: repo.slug,
    htmlUrl: `https://github.com/${repo.slug}`,
    description: repo.description,
    language: repo.language || "Code",
    stars: "—",
    forks: "—",
    updatedAt: null,
  };
}

export default function SoftwareGrid({ repos = softwareRepos }) {
  const [items, setItems] = useState(repos.map(fallbackRepo));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const hasLoadedRef = useRef(false);

  const slugsKey = useMemo(() => repos.map((repo) => repo.slug).filter(Boolean).sort().join("|"), [repos]);

  useEffect(() => {
    if (!slugsKey) {
      setError("No repositories to display right now.");
      return undefined;
    }

    let cancelled = false;
    const controller = new AbortController();

    async function loadRepos() {
      setLoading(true);
      setError("");

      try {
        const headers = { Accept: "application/vnd.github+json" };

        const results = await Promise.allSettled(
          repos.map((repo) =>
            fetch(`${GITHUB_API}/repos/${repo.slug}`, { headers, signal: controller.signal }).then((response) => {
              if (!response.ok) throw new Error(`GitHub ${response.status}`);
              return response.json();
            })
          )
        );

        if (cancelled) return;

        const mapped = results.map((result, index) => {
          if (result.status !== "fulfilled") return fallbackRepo(repos[index]);
          const repo = result.value;
          return {
            id: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            htmlUrl: repo.html_url,
            description: oneLine(repo.description || repos[index].description || ""),
            language: repo.language || repos[index].language || "Code",
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            updatedAt: repo.updated_at,
          };
        });

        setItems(mapped);
        hasLoadedRef.current = true;
      } catch (err) {
        if (!cancelled && !hasLoadedRef.current) {
          setItems(repos.map(fallbackRepo));
          setError("Live GitHub details are unavailable, so I’m showing the curated repository list.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadRepos();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [repos, slugsKey]);

  return (
    <div className="software-wrap">
      <div className="software-status">
        <span>{loading ? "Refreshing repository data..." : "Public GitHub work"}</span>
        {error && <small>{error}</small>}
      </div>

      <div className="software-grid">
        {items.map((repo) => (
          <RepoCard key={repo.id || repo.fullName} repo={repo} />
        ))}
      </div>
    </div>
  );
}

function RepoCard({ repo }) {
  return (
    <article className="repo-card">
      <div className="repo-card-top">
        <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer" title={repo.fullName}>
          {repo.fullName}
        </a>
        <span>{repo.language || "Code"}</span>
      </div>
      <p>{repo.description || "Repository connected to my engineering portfolio."}</p>
      <div className="repo-meta">
        <span>Stars {repo.stars}</span>
        <span>Forks {repo.forks}</span>
        <span>{repo.updatedAt ? `Updated ${new Date(repo.updatedAt).toLocaleDateString()}` : "Curated"}</span>
      </div>
      <a className="text-button" href={repo.htmlUrl} target="_blank" rel="noopener noreferrer">
        View Repo
      </a>
    </article>
  );
}
