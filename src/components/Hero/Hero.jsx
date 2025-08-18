import React, { useEffect, useRef } from "react";
import photo from '../../assets/narendra_new.png';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Hero.css";

const Hero = () => {
  const typingRef = useRef(null);

  useEffect(() => {
    const texts = [
      "DevOps Engineer",
      "Cloud Engineer",
      "MEAN Stack Developer",
      "MERN Stack Developer",
      "UI/UX Developer",
      "Freelancer"
    ];
    const typingSpeed = 120;       
    const deletingSpeed = 80; 
    const pauseAfterTyping = 1500;
    const pauseAfterDeleting = 500;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    function type() {
      const el = typingRef.current;
      if (!el) return;

      const currentText = texts[textIndex];

      if (!isDeleting) {
        // Typing
        el.textContent = currentText.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentText.length) {
          isDeleting = true;
          timeoutId = setTimeout(type, pauseAfterTyping);
          return;
        }
        timeoutId = setTimeout(type, typingSpeed);
      } else {
        // Deleting
        el.textContent = currentText.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          timeoutId = setTimeout(type, pauseAfterDeleting);
          return;
        }
        timeoutId = setTimeout(type, deletingSpeed);
      }
    }

    type();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className="hero-section d-flex align-items-center" id="home">
      <div className="container">
        <div className="row align-items-center mx-5">
          {/* Left Content */}
          <div className="col-lg-6 col-md-12 hero-text">
            <h3 className="mb-2">Hello, I’m</h3>
            <h1 className="mb-3">
              Narendra <br /> Kaduru
            </h1>
            <h2 className="mb-4">
              <span id="typing" ref={typingRef}></span>
            </h2>
            <div>
              <a href="#contact" className="btn-hero me-3">
                Hire Me
              </a>
              <a href="/resume/Narendra_Kaduru_DevOps_Resume_2025.docx" className="btn-hero" download>
                <i className="bi bi-arrow-bar-down"></i>&nbsp; Resume
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="col-lg-6 col-md-12 text-center hero-image">
            <img
              src={photo}
              alt="Hero"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
