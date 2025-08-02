import React, { useEffect } from 'react';
import '../assets/css/bootstrap.min.css';
import '../assets/css/magnific-popup.css';
import '../assets/css/templatemo-style.css';
import '../assets/css/PortraitFade.css';
import '../assets/css/CustomAnimations.css';
import '../assets/css/styles.css';
import IAMScanner from "../components/IAMScanner";



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
        data-image-src="/img/City_Image_RicardoTech.jpg"
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
                  
                  Coding is my passion, and I apply it to solve real-world problems in security and
                  risk management. With experience in web development, IAM, database administration,
                  and security, I build secure systems and manage access to protect people, data, and
                  platforms.{' '}
            

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
    href="https://www.linkedin.com/in/your-profile"
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
    href="mailto:hello@ricardotech.com"
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

  <a
    href="/resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="d-flex align-items-center"
  >
    <img
      src="/img/resume-io-logo-png.png"
      alt="Resume"
      width="32"
      height="32"
      style={{ objectFit: 'contain' }}
    />
  </a>
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
  data-image-src="/img/Sucesss_img02_ RicardoTech.jpg"
>
  <div className="tm-page-content-width">
    <div className="row d-flex align-items-stretch flex-row-reverse">
      
      {/* Right Column: Content Box */}
      <div className="col-md-6 tm-translucent-white-bg tm-content-box tm-textbox-full-height">
        <div className="tm-content-box-inner">
          <h2 className="tm-section-title tm-blue-text">About Me</h2>
          <p>
            I hold a Master’s degree in CyberSecurity and Analytics, and a Bachelor’s degree in Computer Science. Below are the institutions where I studied:
          </p>

          <div className="media tm-media mb-4">
            <img src="/img/st-thomas-university-fl_540.png" alt="St. Thomas University" style={{ width: '64px', height: '64px' }} className="me-3 rounded" />
            <div className="media-body tm-media-body">
              <h5 className="tm-small-font">St. Thomas University</h5>
              <p className="tm-small-font">Master’s in CyberSecurity and Data Analytics</p>
            </div>
          </div>

          <div className="media tm-media mb-4">
            <img src="/img/Thomas_Edison_State_University_seal.png" alt="TESU Logo" style={{ width: '64px', height: '64px' }} className="me-3 rounded" />
            <div className="media-body tm-media-body">
              <h5 className="tm-small-font">Thomas Edison State University</h5>
              <p className="tm-small-font">Bachelor’s in Computer Science</p>
            </div>
          </div>

          <div className="media tm-media mb-4">
            <img src="/img/profed-2024.png" alt="mit_univ_logo" style={{ width: '64px', height: '64px' }} className="me-3 rounded" />
            <div className="media-body tm-media-body">
              <h5 className="tm-small-font">Georgia Tech University (AWS)</h5>
              <p className="tm-small-font">Cloud Practitioner Certification</p>
            </div>
          </div>

          
        </div>
      </div>

      {/* Left Column: Video */}
      <div className="col-md-6 d-flex justify-content-center align-items-center">
        <video
          width="100%"
          height="auto"
          controls
          autoPlay
          muted
          loop
          playsInline
          className="rounded shadow"
          poster="/img/video-poster.jpg"
        >
          <source src="/videos/services-preview.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "wordcloud" ? "active" : ""}`}
            onClick={() => setActiveTab("wordcloud")}
          >
            Word Cloud Analytics
          </button>
        </li>

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
            <h4 className="tm-blue-text">Full-Stack Portfolio</h4>
            <p>Monitor deployment status for your live projects hosted on AWS EC2.</p>

            <div className="mt-4">
              <h5>Description:</h5>
              <p>
                This project showcases real-time status from an AWS EC2 instance hosting the developer’s portfolio. It confirms server uptime, instance type, and availability for external monitoring.
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

            <div className="mt-4">
              <p>Instance: <strong>t2.micro</strong></p>
              <p>Status: <span className="text-success">Healthy ✅</span></p>
              <p>Uptime: 3 days 12 hours</p>
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




      {/* Gallery Section */}
      <section className="parallax-window tm-section tm-section-gallery tm-flex" id="gallery" data-parallax="scroll" data-image-src="/img/bg-03.jpg">
        <div className="tm-page-content-width tm-flex-col tm-gallery-content">
          <div className="tm-content-box-inner">
            <h2 className="tm-section-title">Project Gallery</h2>
            <div className="iso-section">
              <ul className="filter-wrapper clearfix">
                <li><a href="#" data-filter="*" className="selected opc-main-bg">Show All</a></li>
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
      </section>


{/* Contact ME */}
<section className="parallax-window tm-section tm-section-contact" id="contact" data-parallax="scroll" data-image-src="/img/Sucesss_img01RicardoTech.jpg">
   <div className="tm-page-content-width">
          <div className="tm-translucent-white-bg tm-textbox tm-content-box tm-textbox-full-height">
            <h2 className="tm-section-title tm-red-text">Contact Me</h2>
            <p>I will be attanding the following events upcoming.</p>
            <form action="index.html" method="post" className="tm-contact-form">
              <div className="form-group">
                <input type="text" id="contact_name" name="contact_name" className="form-control" placeholder="Name" required />
              </div>
              <div className="form-group">
                <input type="email" id="contact_email" name="contact_email" className="form-control" placeholder="Email" required />
              </div>
              <div className="form-group">
                <textarea id="contact_message" name="contact_message" className="form-control" rows="5" placeholder="Message" required />
              </div>
              <button type="submit" className="tm-btn">Submit</button>
            </form>
          </div>
        </div>

  <div className="tm-copyright-div text-center">
    <p className="tm-copyright-text">
      Copyright &copy; <span className="tm-current-year">2024</span> RicardoTech.com 
    </p>
  </div>
</section>
   




      {/* Contact Section */}
   
    </div>
  );
}

export default Home;
