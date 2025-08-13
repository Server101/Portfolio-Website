import React, { useEffect } from 'react';
import '../assets/css/bootstrap.min.css';
import '../assets/css/magnific-popup.css';
import '../assets/css/templatemo-style.css';
import '../assets/css/PortraitFade.css';
import '../assets/css/CustomAnimations.css';
import '../assets/css/styles.css';
import IAMScanner from "../components/IAMScanner";


import NavigationBar from "../components/NavigationBar";




import ContactForm from '../components/ContactForm';
import SoftwareGrid from '../components/SoftwareGrid';
//import HealthPanel from "../components/HealthPanel";
import DigitalLights from "../components/DigitalLights";
import WordSlider from '../components/WordSlider'; // Typing animation
import ThreatDashboard from '../components/ThreatDashboard';


// import Typewriter from '../components/Typewriter'; // Optional if still used



function Home() {
  const [activeTab, setActiveTab] = React.useState("portfolio");



  // Home.jsx (top of component)
// 1) Stable repos for Software tab (prevents re-fetch flicker)
const softwareRepos = React.useMemo(() => [
  { id: "iam", slug: "Server101/objaverse-xl" },
  { id: "threat", slug: "Server101/Analytical-Web-App" },
  { id: "portfolio", slug: "Server101/go-ethereum" },
  { id: "iam2", slug: "Server101/bitcoin" },
  { id: "threat2", slug: "Server101/textbookstore-ui" },
  { id: "portfolio2", slug: "Server101/Geek-Text" },
], []);

// 2) Live health state
const [health, setHealth] = React.useState(null);
const [healthErr, setHealthErr] = React.useState("");

// 3) 1s ticker so durations advance smoothly between 10s polls
const [now, setNow] = React.useState(Date.now());
React.useEffect(() => {
  const id = setInterval(() => setNow(Date.now()), 1000);
  return () => clearInterval(id);
}, []);

// 4) Poll /api/health every 10s and stamp fetch time
React.useEffect(() => {
  let alive = true;
  async function fetchHealth() {
    try {
      const res = await fetch("/api/health", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (alive) {
        json._fetchedAt = Date.now();   // <— keep INSIDE this effect
        setHealth(json);
        setHealthErr("");
      }
    } catch (e) {
      if (alive) setHealthErr("Health check unavailable");
    }
  }
  fetchHealth();
  const id = setInterval(fetchHealth, 10000);
  return () => { alive = false; clearInterval(id); };
}, []);

// 5) Helpers
const liveSeconds = (baseSeconds, fetchedAt, nowMs) =>
  Number(baseSeconds || 0) +
  Math.max(0, Math.floor(((nowMs || Date.now()) - (fetchedAt || Date.now())) / 1000));

const fmtDuration = (seconds, withSeconds = false) => {
  const s = Math.max(0, Number(seconds || 0));
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  return withSeconds ? `${d}d ${h}h ${m}m ${sec}s` : `${d}d ${h}h ${m}m`;
};

// End of code block


// For home bg fade in
const [bgReady, setBgReady] = React.useState(false);

React.useEffect(() => {
  const img = new Image();
  img.src = "/img/ricardoTech_0212.jpg";
  img.onload = () => setBgReady(true);
}, []);

// End of block

// Reacte detection for mobile Browsing:
React.useEffect(() => {
  const mq = window.matchMedia('(max-width: 991.98px)');
  const onChange = (e) => document.body.classList.toggle('is-mobile', e.matches);
  onChange(mq);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}, []);
// End of code block

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);

        // Image fade-in logic
   const img = document.getElementById('fadeImage');

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    },
    { threshold: 0.3 }
  );

  if (img) observer.observe(img);
  return () => {
    if (img) observer.unobserve(img);
  };
}, []);



    };

    (async () => {
      try {
        await loadScript('/js/jquery-1.11.3.min.js');
        await loadScript('/js/isotope.pkgd.min.js');
        await loadScript('/js/imagesloaded.pkgd.min.js');
        await loadScript('/js/jquery.magnific-popup.min.js');
        await loadScript('/js/parallax.min.js');
        await loadScript('/js/init.js');
      } catch (err) {
        console.error('Failed to load script:', err);
      }
    })();

    

    return () => {
      document.querySelectorAll('script[src*="/js/"]').forEach(script => script.remove());
    };
  }, []);

  return (
    <div className="container-fluid" id="main">
    <NavigationBar />
   



      {/* Home Section */}
      
    <section
  className={`parallax-window tm-section tm-section-home d-flex align-items-center ${bgReady ? "bg-in" : ""}`}
  id="home"
  data-parallax="scroll"
  data-image-src="/img/ricardoTech_0212.jpg"
  style={{ minHeight: "100vh", position: "relative" }}
>
  {/* Fade veil to reveal the background smoothly */}
  <div className={`bg-veil ${bgReady ? "bg-veil--hide" : ""}`} />

  <div className="container" style={{ position: "relative", zIndex: 1 }}>
    <div className="row justify-content-center">
      <div className="col-lg-8 text-center">
        <div className="tm-site-title-wrap mb-4 d-flex justify-content-center align-items-center" style={{ minHeight: "150px" }} />
        
        {/* White card: fades/settles in after bg is visible (no scale) */}
        <div className={`tm-textbox tm-white-bg p-4 rounded shadow hero-card ${bgReady ? "hero-card--in" : ""}`}>
          <h2 className="tm-green-text tm-section-title">Hello, I'm Ricardo!</h2>

          {/* Your existing portrait fade — keep as is */}
          <div className="fade-in-image-container">
            <img
              src="/img/IMG-20250810-WA0005.jpg"
              alt="Portrait"
              className="fade-in-image"
              id="fadeImage"
            />
          </div>

                <WordSlider />
                <p>
                  
               I’m passionate about software engineering, cybersecurity, and artificial intelligence, applying them to solve real-world challenges and manage risk. 
               With a strong foundation in data structures and computing logic, I build secure, full-stack systems and manage access controls (IAM) across platforms. 
               I thrive in agile environments and have hands-on experience integrating AI into security workflows to enhance threat detection and support informed decision-making.

{' '}
            

                </p>
{/* Social Media Icons */}
<div className="social-links mt-4 d-flex justify-content-center flex-wrap gap-4">
  <a
    href="https://github.com/Server101"
    target="_blank"
    rel="noopener noreferrer"
    className="d-flex align-items-center"
  >
    <img
      src="/img/github_original_wordmark_logo.png"
      alt="GitHub"
      width="32"
      height="32"
      style={{ objectFit: 'contain' }}
    />
  </a>

  <a
    href="https://www.linkedin.com/in/Ricardo-Tech"
    target="_blank"
    rel="noopener noreferrer"
    className="d-flex align-items-center"
  >
    <img
      src="/img/linkedin-logo-png.png"
      alt="LinkedIn"
      width="32"
      height="32"
      style={{ objectFit: 'contain' }}
    />
  </a>

  <a
    href="mailto:rbrown@ricardotech.com"
    className="d-flex align-items-center"
  >
    <img
      src="/img/email-message-icon.png"
      alt="Email"
      width="32"
      height="32"
      style={{ objectFit: 'contain' }}
    />
  </a>

  {/*<a
    href="/resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="d-flex align-items-center"
  >

       Filter Out the Resume 
    <img
      src="/img/resume-io-logo-png.png"
      alt="Resume"
      width="32"
      height="32"
      style={{ objectFit: 'contain' }}
    />
  </a>*/}
</div>
              </div>
            </div>
          </div>
        </div>
      </section>


{/* Services About Me */}

<section 
  className="parallax-window tm-section tm-section-services"
  id="services"
  data-parallax="scroll"
  data-image-src="/img/Cors_Image.jpg"
>
  <div className="tm-page-content-width">
    <div className="row d-flex align-items-stretch flex-row-reverse">

  {/* RIGHT COLUMN: About Me Text */}
<div className="col-md-6 tm-content-box tm-textbox-full-height about-me-lighter">
  <div className="tm-content-box-inner tm-translucent-white-bg rounded">
    <h2 className="tm-section-title tm-blue-text">About Me</h2>

    <p className="about-intro">
      <strong>My journey into tech began with a deep interest for problem-solving and computing logic</strong>,
      and over the years, that passion has evolved into a mission: using software and security strategy to solve real-world challenges.
    </p>

    <p className="about-body">
      At <strong>Dream Coders Academy</strong>, I’ve mastered my skills as a full-stack developer and advanced into a cybersecurity designing &
      building secure applications with <strong>Java</strong>, <strong>React</strong>, deploying on <strong>AWS</strong>,
      and managing <strong>IAM</strong> and <strong>RBAC</strong> systems. I work in <strong>agile environments</strong>,
      collaborate across teams, and apply <strong>AI tools</strong> to improve threat detection and access control.
    </p>

    <p className="about-goal">
      I’m currently preparing for the <strong>CISSP certification</strong> as I work toward becoming a
      security leader who bridges <strong>engineering, risk, governance, Ai and machine learning</strong>.
    </p>
  </div>
</div>

      {/* LEFT COLUMN: Video + Education Logos */}
      <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center">

        {/* Video Section 
        <video
          width="100%"
          height="auto"
          controls
          autoPlay
          muted
          loop
          playsInline
          className="rounded shadow mb-4"
          poster="/img/video-poster.jpg"
        >
          <source src="/videos/services-preview.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>*/}

<div className="w-100 px-3 tm-translucent-white-bg p-3 rounded">
  <div className="media tm-media mb-3 align-items-center">
    <img src="/img/st-thomas-university-fl_540.png" alt="St. Thomas University" style={{ width: '96px', height: '96px' }} className="me-3 rounded" />
    <div className="media-body tm-media-body text-start">
      <h3 className="tm-small-font fw-bold mb-1"><strong>St. Thomas University(STU)</strong></h3>
      <p className="tm-small-font fw-semibold mb-0">Master of Science in CyberSecurity and Data Analytics</p>
      <p className="tm-small-font fw-semibold mb-0">2025-2026</p>
    </div>
  </div>



  <div className="media tm-media mb-3 align-items-center">
    <img src="/img/Thomas_Edison_State_University_seal.png" alt="TESU Logo" style={{ width: '96px', height: '96px' }} className="me-3 rounded" />
    <div className="media-body tm-media-body text-start">
      <h3 className="tm-small-font fw-bold mb-1"><strong>Thomas Edison State University(TESU)</strong></h3>
      <p className="tm-small-font fw-semibold mb-0">Bachelor of Science in Computer Science</p>
      <p className="tm-small-font fw-semibold mb-0">2017-2021</p>
    </div>
  </div>

  {/* Filter Out

  <div className="media tm-media align-items-center">
    <img src="/img/profed-2024.png" alt="MIT Logo" style={{ width: '96px', height: '96px' }} className="me-3 rounded" />
    <div className="media-body tm-media-body text-start">
      <h3 className="tm-small-font fw-bold mb-1"><strong>Massachusetts Institute of Technology(MIT)</strong></h3>
      <p className="tm-small-font fw-semibold mb-0">Professional Certificate in Cybersecurity</p>
    </div>
  </div>*/}
</div>


      </div>

    </div>
  </div>
</section>



{/* Projects */}
<section
  className="parallax-window tm-section tm-section-gallery tm-flex"
  id="projects"
  data-parallax="scroll"
  data-image-src="/img/bg-03.jpg"
>
  <div className="tm-page-content-width tm-flex-col tm-gallery-content d-flex justify-content-center">
    <div
      className="tm-translucent-white-bg tm-textbox tm-content-box tm-textbox-full-height text-center p-4 rounded shadow"
      style={{ maxWidth: '1140px', width: '100%' }}
    >
      <h2 className="tm-section-title tm-blue-text">Live Project Demos</h2>

      {/* Navigation Tabs */}
      <ul className="nav nav-tabs justify-content-center mb-4 mt-3" id="projectTabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "portfolio" ? "active" : ""}`}
            onClick={() => setActiveTab("portfolio")}
          >
            Full-Stack Portfolio
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "threat" ? "active" : ""}`}
            onClick={() => setActiveTab("threat")}
          >
            Threat Monitoring
          </button>
        </li>
        {/* Tab Content 
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "wordcloud" ? "active" : ""}`}
            onClick={() => setActiveTab("wordcloud")}
          >
            Word Cloud Analytics
          </button>
        </li>*/}

        <li className="nav-item">
  <button
    className={`nav-link ${activeTab === "iamScanner" ? "active" : ""}`}
    onClick={() => setActiveTab("iamScanner")}
  >
    IAM Misconfiguration Detector
  </button>
</li>

      </ul>





      {/* Tab Content */}
      <div className="tab-content text-start px-3">
        {/* Full-Stack Portfolio */}
{activeTab === "portfolio" && (
  <div className="tab-pane fade show active">
    <div className="d-flex flex-wrap align-items-center justify-content-between mb-2">
      <h4 className="tm-blue-text m-0">Full-Stack Portfolio</h4>
      <span className="status-chip">
        {(() => {
          const pm2AllOnline = health?.pm2?.available ? health.pm2.apps?.every(a => a.status === "online") : true;
          const computed = healthErr ? "down" : pm2AllOnline ? "healthy" : "degraded";
          const status = health?.status || computed;
          return <DigitalLights status={status} label={false} />;
        })()}
        Live
      </span>
    </div>

    <p className="mb-3">AWS EC2 Deployment Status.</p>

    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div className="row g-3">
          {/* KPI: Instance */}
          <div className="col-12 col-md-4">
            <div className="kpi-tile">
              <div className="kpi-label">Instance</div>
              <div className="kpi-value">
                {health?.ec2?.instanceType || "—"}{" "}
                <span className="text-muted">
                  {health?.ec2?.instanceId ? `(${health.ec2.instanceId})` : ""}
                </span>
              </div>
              <div className="mt-2">
                <DigitalLights
                  status={(health?.status) || (healthErr ? "down" : "healthy")}
                  label={true}
                />
              </div>
            </div>
          </div>

          {/* KPI: Process Runtime */}
          <div className="col-12 col-md-4">
            <div className="kpi-tile">
              <div className="kpi-label">Process Runtime</div>
              {/* Process Runtime */}
<div className="kpi-value">
  Node {health?.runtime?.node || "—"} • {fmtDuration(liveSeconds(health?.runtime?.upSeconds, health?._fetchedAt, now), true)}
</div>
              
              <div className="mt-2">
                <DigitalLights
                  status={healthErr ? "down" : "healthy"}
                  label={true}
                />
              </div>
            </div>
          </div>

          {/* KPI: Instance Uptime */}
          <div className="col-12 col-md-4">
            <div className="kpi-tile">
              <div className="kpi-label">Instance Uptime</div>
              {/* Instance Uptime */}
<div className="kpi-value">
  {fmtDuration(liveSeconds(health?.system?.upSeconds, health?._fetchedAt, now), true)}
</div>
              
              <div className="mt-2">
                <DigitalLights
                  status={healthErr ? "down" : "healthy"}
                  label={true}
                />
              </div>
            </div>
          </div>

          {/* Load bar */}
          <div className="col-12">
            <div className="kpi-label mb-1">CPU Load (1m)</div>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${Math.min(100, Math.round(((health?.system?.load?.["1m"] || 0) / 2) * 100))}%`
                }}
              />
            </div>
            <div className="small text-muted mt-1">
              {health?.system?.load?.["1m"]?.toFixed?.(2) ?? "—"} (1m) •{" "}
              {health?.system?.load?.["5m"]?.toFixed?.(2) ?? "—"} (5m)
            </div>
          </div>

          {/* PM2 table (if available) */}
          {health?.pm2?.available && (
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-sm align-middle mb-0">
                  <thead>
                    <tr><th>App</th><th>Status</th><th>CPU</th><th>Memory</th><th>Uptime</th></tr>
                  </thead>
                  <tbody>
                    {health.pm2.apps.map(a => (
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

          {healthErr && (
            <div className="col-12">
              <div className="alert alert-warning py-2 mb-0">{healthErr}</div>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Restored Description & Tech Stack */}
    <div className="mt-4">
      <h5>Description:</h5>
      <p>
       This project displays the real-time health of my AWS EC2–hosted portfolio—confirming server uptime, instance type, and external availability for monitoring.
      </p>
    </div>
    <div className="mt-3">
      <h6>Tech Stack:</h6>
      <span className="badge bg-info me-2">React</span>
      <span className="badge bg-info me-2">Node.js</span>
      <span className="badge bg-info me-2">Express</span>
      <span className="badge bg-info me-2">AWS EC2</span>
      <span className="badge bg-info me-2">Nginx</span>
      <span className="badge bg-info me-2">PM2</span>
    </div>
  </div>
)}



        {/* Threat Monitoring */}
        {activeTab === "threat" && (
          <div className="tab-pane fade show active">
            <h4 className="tm-blue-text">Threat Monitoring Tool</h4>
            <p>Scan URLs for threats using custom logic and external threat intelligence APIs.</p>

         

            <div className="mt-3">
              <h6>Tech Stack:</h6>
              <span className="badge bg-info me-2">React</span>
              <span className="badge bg-info me-2">Node.js</span>
              <span className="badge bg-info me-2">Express</span>
              <span className="badge bg-info me-2">PostgreSQL</span>
              <span className="badge bg-info me-2">VirusTotal API</span>
              <span className="badge bg-info me-2">AbuseIPDB API</span>
            </div>

            <div className="mt-4">
              <ThreatDashboard />
            </div>
          </div>
        )}

        {/* IAM Scanner */}

      {activeTab === "iamScanner" && (
  <div className="tab-pane fade show active">
    <h4 className="tm-blue-text">AI Gemini-Powered IAM Misconfiguration Detector</h4>
  

    {/* Project Description */}
    <div className="mt-4">
      <h5>Description:</h5>
      <p>
        This tool scans AWS IAM configurations and uses Gemini to detect misconfigurations like wildcard permissions,
        missing MFA, publicly accessible resources, and risky trust relationships. It returns human-readable summaries
        and remediation steps.
      </p>
    </div>
<IAMScanner />
    {/* Features List */}

    {/* Tech Stack */}
    <div className="mt-3">
      <h6>Tech Stack:</h6>
      <span className="badge bg-info me-2">React</span>
      <span className="badge bg-info me-2">Node.js</span>
      <span className="badge bg-info me-2">Express</span>
      <span className="badge bg-info me-2">AWS SDK</span>
      <span className="badge bg-info me-2">Google Gemini API</span>
      <span className="badge bg-info me-2">PostgreSQL, Docker, Nginx</span>
    </div>
  </div>
)}
        
      </div>
    </div>
  </div>
</section>




      {/* Gallery Section 
      <section className="parallax-window tm-section tm-section-gallery tm-flex" id="gallery" data-parallax="scroll" data-image-src="/img/bg-03.jpg">
        <div className="tm-page-content-width tm-flex-col tm-gallery-content">
          <div className="tm-content-box-inner">
            <h2 className="tm-section-title">Gallery</h2>
            <div className="iso-section">
              <ul className="filter-wrapper clearfix">
                <li><a href="#" data-filter="*" className="selected opc-main-bg">Show All</a></li>
                 Gallery Options for additional Images
                <li><a href="#" className="opc-main-bg" data-filter=".design">CyberSecurity</a></li>
                <li><a href="#" className="opc-main-bg" data-filter=".artwork">Data Analytics</a></li>
                <li><a href="#" className="opc-main-bg" data-filter=".website">Full-Stack Engineer</a></li>
              </ul>
            </div>
            <div className="iso-box-section">
              <div className="iso-box-wrapper col4-iso-box">
                {[...Array(10)].map((_, i) => {
                  const category = i < 4 ? 'design' : i < 6 ? 'artwork' : 'website';
                  return (
                    <div className={`iso-box ${category} col-6 col-sm-4 col-md-4 col-lg-3 col-xl-3`} key={i}>
                      <a href={`/img/gallery-img-0${i + 1}.jpg`}>
                        <img src={`/img/gallery-img-0${i + 1}.jpg`} alt={`Gallery ${i + 1}`} className="img-fluid" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>*/}


{/* Software Section (above Contact) */}


<section
  className="parallax-window tm-section"
  id="software"
  data-parallax="scroll"
  data-image-src="/img/bg-03.jpg"
>
  <div className="tm-page-content-width tm-flex-col tm-gallery-content d-flex justify-content-center">
    <div
      className="tm-translucent-white-bg tm-textbox tm-content-box tm-textbox-full-height text-center p-4 rounded shadow"
      style={{ maxWidth: '1140px', width: '100%' }}
    >
      <h2 className="tm-section-title tm-blue-text mb-3 text-center">Software</h2>

      <SoftwareGrid repos={softwareRepos} />
      
    </div>
  </div>
</section>






{/* Contact Section (uses working backend /api/contact) */}
      <section
        className="parallax-window tm-section tm-section-contact"
        id="contact"
        data-parallax="scroll"
        data-image-src="/img/Sucesss_img01RicardoTech.jpg"
      >
        <div className="tm-page-content-width"
        style={{ paddingTop: "2rem" }}>
          <div className="tm-translucent-white-bg tm-textbox tm-content-box tm-textbox-full-height">
            <ContactForm />
          </div>
        </div>

        <div className="tm-copyright-div text-center">
          <p className="tm-copyright-text">
            Copyright &copy; <span className="tm-current-year">2025</span> RicardoTech.com
          </p>
        </div>
      </section>
   




      {/* Contact Section */}
   
    </div>
  );
}

export default Home;
