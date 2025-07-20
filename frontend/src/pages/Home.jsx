import React, { useEffect } from 'react';
import '../assets/css/bootstrap.min.css';
import '../assets/css/magnific-popup.css';
import '../assets/css/templatemo-style.css';

function Home() {
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = false; // load in order
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    // Load jQuery first, then plugins and init.js
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

    // Cleanup: remove loaded scripts on component unmount
    return () => {
      document.querySelectorAll('script[src*="/js/"]').forEach(script => script.remove());
    };
  }, []);

  return (
    <div className="container-fluid" id="main">
      <section className="parallax-window tm-section tm-section-home" id="home" data-parallax="scroll" data-image-src="/img/bg-01.jpg">
        <div className="tm-page-content-width tm-padding-b">
          <div className="text-center tm-site-title-wrap">
            <h1 className="tm-site-title">Page One</h1>
          </div>
          <div className="tm-textbox tm-white-bg">
            <h2 className="tm-green-text tm-section-title">Welcome!</h2>
            <p>
              Page One is a parallax clean layout with beautiful images from <a rel="nofollow" href="https://unsplash.com" target="_blank">Unsplash</a>.
            </p>
            <p>
              Please mention TemplateMo site to your friends. Thank you.
            </p>
            <a href="#services" className="tm-btn">Let's Begin</a>
          </div>
        </div>
      </section>

      {/* Add the rest of your JSX content (services, gallery, contact) here */}
    </div>
  );
}

export default Home;