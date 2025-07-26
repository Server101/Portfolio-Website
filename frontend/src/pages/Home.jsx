import React, { useEffect } from 'react';
import '../assets/css/bootstrap.min.css';
import '../assets/css/magnific-popup.css';
import '../assets/css/templatemo-style.css';
import '../assets/css/PortraitFade.css';
import WordSlider from '../components/WordSlider'; // Typing animation
import '../assets/css/CustomAnimations.css';

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
        data-image-src="/img/bg-01.jpg"
        style={{ minHeight: '100vh' }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="tm-site-title-wrap mb-4 d-flex justify-content-center align-items-center" style={{ minHeight: '150px' }}>
  <h1 className="tm-site-title text-center">WELCOME</h1>
</div>
              <div className="tm-textbox tm-white-bg p-4 rounded shadow">
                <h2 className="tm-green-text tm-section-title">Hello, I'm Richard James!</h2>

                {/* Begining of the image fade effect */}
            <div className="fade-in-image-container">
            <img
      src="/img/gallery-img-03.jpg"
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
                  <a rel="nofollow" href="https://unsplash.com" target="_blank">
                    Unsplash
                  </a>.
                </p>
                <p>Please mention TemplateMo site to your friends. Thank you.</p>
                <a href="#services" className="tm-btn">
                  Let's Begin
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


{/* Services Section */}
<section
  className="parallax-window tm-section tm-section-services"
  id="services"
  data-parallax="scroll"
  data-image-src="/img/bg-02.jpg"
>
  <div className="tm-page-content-width">
    <div className="row d-flex align-items-stretch flex-row-reverse">
      
      {/* Right Column: Content Box */}
      <div className="col-md-6 tm-translucent-white-bg tm-content-box tm-textbox-full-height">
        <div className="tm-content-box-inner">
          <h2 className="tm-section-title tm-blue-text">Our Services</h2>
          <p>
            Etiam sed diam hendrerit dolor posuere dignissim. Integer eget
            nunc consequat, posuere augue maximus, elementum metus.
          </p>
          <div className="media tm-media">
            <i className="fa fa-4x fa-podcast tm-media-icon" />
            <div className="media-body tm-media-body">
              <p className="tm-small-font">
                Integer iaculis sollicitudin ex vel condimentum.
              </p>
            </div>
          </div>
          <div className="media tm-media">
            <i className="fa fa-3x fa-calendar tm-media-icon" />
            <div className="media-body tm-media-body">
              <p className="tm-small-font">
                Integer iaculis sollicitudin ex vel condimentum.
              </p>
            </div>
          </div>
          <div className="media tm-media">
            <i className="fa fa-3x fa-bell-o tm-media-icon" />
            <div className="media-body tm-media-body">
              <p className="tm-small-font">
                Integer iaculis sollicitudin ex vel condimentum.
              </p>
            </div>
          </div>
          <a href="#gallery" className="tm-btn">More Info.</a>
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


{/* Project Showcase Section inside Gallery Parallax */}
<section
  className="parallax-window tm-section tm-section-gallery tm-flex"
  id="projects"
  data-parallax="scroll"
  data-image-src="/img/bg-03.jpg"
>
  <div className="tm-page-content-width tm-flex-col tm-gallery-content">
    <div className="tm-translucent-white-bg tm-textbox tm-content-box tm-textbox-full-height text-center p-4 rounded shadow">
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
      </ul>

      {/* Tab Content */}
      <div className="tab-content text-start px-3">
        {activeTab === "portfolio" && (
          <div>
            <h4 className="tm-blue-text">AWS EC2 Site Health Status</h4>
            <p>Instance: <strong>t2.micro</strong></p>
            <p>Status: <span className="text-success">Healthy ✅</span></p>
            <p>Uptime: 3 days 12 hours</p>
          </div>
        )}

        {activeTab === "threat" && (
          <div>
            <h4 className="tm-blue-text">Security Dashboard</h4>
            <p>Real-time log ingestion, threat scoring, and behavior alerts</p>
            <ul className="text-start">
              <li>✓ Web App Access Logs</li>
              <li>✓ AWS CloudTrail Integration</li>
              <li>✓ Suspicious IP alerts</li>
              <li>✓ API key misuse detection</li>
            </ul>
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
            <h2 className="tm-section-title">Projects</h2>
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


{/* Upcoming Events */}
<section className="parallax-window tm-section tm-section-contact" id="contact" data-parallax="scroll" data-image-src="/img/bg-04.jpg">
  <div className="tm-page-content-width d-flex justify-content-center">
    <div className="tm-translucent-white-bg tm-textbox tm-content-box tm-textbox-full-height text-center">
      <h2 className="tm-section-title tm-red-text">Upcoming Events</h2>
      <p>I will be attending the following upcoming events.</p>
      <img 
        src="/img/black_hat_event.PNG" 
        alt="Portrait" 
        style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }} 
      />
    </div>
  </div>
  <div className="tm-copyright-div text-center">
    <p className="tm-copyright-text">
      Copyright &copy; <span className="tm-current-year">2024</span> RicardoTech.com 
    </p>
  </div>
</section>
   




      {/* Contact Section */}
      <section className="parallax-window tm-section tm-section-contact" id="contact" data-parallax="scroll" data-image-src="/img/bg-04.jpg">
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
        <div className="tm-copyright-div">
          <p className="tm-copyright-text">
            Copyright &copy; <span className="tm-current-year">2024</span> RicardoTech.com 
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
