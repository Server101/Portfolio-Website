import React, { useEffect } from 'react';
import '../assets/css/bootstrap.min.css';
import '../assets/css/magnific-popup.css';
import '../assets/css/templatemo-style.css';
import '../assets/css/PortraitFade.css';
import '../assets/css/CustomAnimations.css';
import '../assets/css/styles.css';
import IAMScanner from "../components/IAMScanner";

import ContactForm from '../components/ContactForm';
import SoftwareGrid from '../components/SoftwareGrid';

import HealthPanel from "../components/HealthPanel";
import DigitalLights from "../components/DigitalLights";


import Navbar from '../components/Navbar';


import WordSlider from '../components/WordSlider'; // Typing animation
import ThreatDashboard from '../components/ThreatDashboard';


// import Typewriter from '../components/Typewriter'; // Optional if still used



function Home() {
  const [activeTab, setActiveTab] = React.useState("portfolio");



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
    
   



      {/* Home Section */}
      
      <section
        className="parallax-window tm-section tm-section-home d-flex align-items-center"
        id="home"
        data-parallax="scroll"
        data-image-src="/img/ricardoTech_0212.jpg"
        style={{ minHeight: '100vh' }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="tm-site-title-wrap mb-4 d-flex justify-content-center align-items-center" style={{ minHeight: '150px' }}>
  
</div>
              <div className="tm-textbox tm-white-bg p-4 rounded shadow">
                <h2 className="tm-green-text tm-section-title">Hello, I'm Ricardo!</h2>

                {/* Begining of the image fade effect */}
            <div className="fade-in-image-container">
            <img
      src="/img/gfhuf7f7.jpg"
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
  <div className="tm-content-box-inner">
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
    <h4 className="tm-blue-text d-flex align-items-center gap-3">
      Full-Stack Portfolio
      <DigitalLights /> {/* small inline lights next to title */}
    </h4>
    <p>Monitor deployment status for your live projects hosted on AWS EC2.</p>

    {/* LIVE HEALTH PANEL */}
    <div className="mt-3">
      <HealthPanel pollMs={10000} />
    </div>

    {/* Description & Tech Stack stay below */}
    <div className="mt-4">
      <h5>Description:</h5>
      <p>
        This project showcases real-time status from an AWS EC2 instance hosting the developer’s portfolio.
        It confirms server uptime, instance type, and availability for external monitoring.
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
    <h4 className="tm-blue-text">Gemini-Powered IAM Misconfiguration Detector</h4>
  

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
      <span className="badge bg-info me-2">Optional: PostgreSQL, Docker, Nginx</span>
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
      <SoftwareGrid
        repos={[
          { id: "iam", slug: "Server101/bitcoin" },
          { id: "threat", slug: "Server101/Analytical-Web-App" },
          { id: "portfolio", slug: "Server101/portfolio-website" },
           { id: "am", slug: "Server101/bitcoin" },
          { id: "treat", slug: "Server101/Analytical-Web-App" },
          { id: "prtfolio", slug: "Server101/portfolio-website" },
        ]}
      />
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
