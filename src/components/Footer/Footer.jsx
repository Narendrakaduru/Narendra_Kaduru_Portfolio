import React from "react";
import "./Footer.css"; // Import the CSS

const Footer = () => {
  return (
    <footer className="st-footer">
      <div className="container">
        <div className="st-copyright-wrap text-center">
          <div className="st-copyright-text">
            © {new Date().getFullYear()}. Designed by{" "}
            <a
              href="https://laralink.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Narendra
            </a>
            . All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
