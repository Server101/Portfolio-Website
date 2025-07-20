import React, { useEffect } from 'react';

const HomeTemplate = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/js/main.js'; // make sure this matches your JS asset name
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="container-fluid" id="main">
      {/* Paste all HTML from <body> here, convert `class` to `className` */}
      {/* Example: <div class="tm-section"> --> <div className="tm-section"> */}
      {/* Also replace all `href="img/...` and `src="img/...` with `/assets/img/...` or wherever your images are */}
    </div>
  );
};

export default HomeTemplate;