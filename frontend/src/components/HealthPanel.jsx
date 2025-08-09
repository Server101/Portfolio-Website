import React from "react";
import DigitalLights from "./DigitalLights";

function fmtDuration(seconds) {
  const s = Number(seconds || 0);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${d}d ${h}h ${m}m`;
}

export default function HealthPanel({ pollMs = 10000 }) {
  const [data, setData] = React.useState(null);
  const [err, setErr] = React.useState("");

  React.useEffect(() => {
    let alive = true;
    async function tick() {
      try {
        const res = await fetch("/api/health", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const j = await res.json();
        if (alive) { setData(j); setErr(""); }
      } catch (e) {
        if (alive) setErr("Health check unavailable");
      }
    }
    tick();
    const id = setInterval(tick, pollMs);
    return () => { alive = false; clearInterval(id); };
  }, [pollMs]);


 // If the backend says "healthy|degraded|down", prefer that.
 // Missing PM2 should NOT mark you degraded.
 const pm2AllOnline = data?.pm2?.available
   ? data.pm2.apps?.every(a => a.status === "online")
   : true; // neutral if PM2 unavailable

 const computed =
   err ? "down"
   : pm2AllOnline ? "healthy"
   : "degraded";

 const status = data?.status || computed;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <div className="small text-muted">Instance</div>
            <div className="fw-semibold">
              {data?.ec2?.instanceType || "—"}{" "}
              <span className="text-muted">
                {data?.ec2?.instanceId ? `(${data.ec2.instanceId})` : ""}
              </span>
            </div>
          </div>

          <div className="col-12 col-md-4">

 <div className="small text-muted">Runtime</div>
 <div className="fw-semibold">
   Node {data?.runtime?.node || "—"} • Proc Up {fmtDuration(data?.runtime?.upSeconds)}
 </div>

 <div className="small text-muted mt-2">Instance Uptime</div>
 <div className="fw-semibold">
   Up {fmtDuration(data?.system?.upSeconds)} {/* this is the system/instance uptime */}
 </div>
          </div>

          <div className="col-12 col-md-4 d-flex align-items-center">
            <DigitalLights status={status} />
          </div>

          <div className="col-12">
            <div className="progress" title={`1m load: ${data?.system?.load?.["1m"] ?? "—"}`}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${Math.min(100, Math.round(((data?.system?.load?.["1m"] || 0) / 2) * 100))}%` }}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                CPU load (1m): {data?.system?.load?.["1m"]?.toFixed?.(2) ?? "—"}
              </div>
            </div>
          </div>

          {data?.pm2?.available && (
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-sm align-middle mb-0">
                  <thead>
                    <tr><th>App</th><th>Status</th><th>CPU</th><th>Memory</th><th>Uptime</th></tr>
                  </thead>
                  <tbody>
                    {data.pm2.apps.map(a => (
                      <tr key={a.name}>
                        <td>{a.name}</td>
                        <td>
                          <span className={`badge ${a.status === "online" ? "bg-success" : "bg-warning text-dark"}`}>
                            {a.status}
                          </span>
                        </td>
                        <td>{a.cpu ?? "—"}%</td>
                        <td>{a.memory ? `${Math.round(a.memory/1024/1024)} MB` : "—"}</td>
                        <td>{fmtDuration(Math.floor((a.uptimeMs || 0)/1000))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {err && (
            <div className="col-12">
              <div className="alert alert-warning py-2 mb-0">{err}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
