import React from "react";
import "./Resume.css";

// Importing images from assets
import ResumeIcon1 from "../../assets/resume-icon1.png";
import ResumeIcon2 from "../../assets/resume-icon2.png";

const Resume = () => {
  return (
    <section id="resume" className="st-dark-bg resume-section">
      <div className="st-height-b100 st-height-lg-b80"></div>

      <div className="st-section-heading st-style1">
        <h4 className="st-section-heading-title">Resume</h4>
      </div>

      <div
        className="container mt-5"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="200"
      >
        <div className="row">
          {/* Education */}
          <div className="col-lg-6">
            <div className="st-height-b0 st-height-lg-b50"></div>
            <div className="st-resume-wrap">
              <div className="st-resume-heading">
                <img src={ResumeIcon1} alt="resume-icon" />
                <h2 className="st-resume-heading-title">Education</h2>
              </div>
              <div className="st-height-b50 st-height-lg-b30"></div>

              <div className="st-resume-timeline-wrap">
                <div className="st-resume-timeline">
                  <h3 className="st-resume-timeline-title">
                    Master of Computer Science
                  </h3>
                  <div className="st-resume-timeline-duration">2015 - 2018</div>
                  <h4 className="st-resume-timeline-subtitle">JNTU ANANTAPUR</h4>
                  <div className="st-resume-timeline-text">
                    <p>
                        Gained hands-on experience with Angular, Node.js, and MongoDB.<br/>
                        Graduated with First Class with Distinction.
                    </p>
                  </div>
                </div>

                <div className="st-resume-timeline">
                  <h3 className="st-resume-timeline-title">
                    Bachelor of Computer Science
                  </h3>
                  <div className="st-resume-timeline-duration">2011 - 2015</div>
                  <h4 className="st-resume-timeline-subtitle">JNTU ANANTAPUR</h4>
                  <div className="st-resume-timeline-text">
                    <p>
                        Learned HTML, CSS, and JavaScript.<br/>
                        Graduated with First Class.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="st-height-b100 st-height-lg-b80"></div>
          </div>

          {/* Experience */}
          <div className="col-lg-6">
            <div className="st-height-b0 st-height-lg-b50"></div>
            <div className="st-resume-wrap">
              <div className="st-resume-heading">
                <img src={ResumeIcon2} alt="resume-icon" />
                <h2 className="st-resume-heading-title">Experience</h2>
              </div>
              <div className="st-height-b50 st-height-lg-b30"></div>

              <div className="st-resume-timeline-wrap">
                <div className="st-resume-timeline">
                  <h3 className="st-resume-timeline-title">Senior Software Engineer</h3>
                  <div className="st-resume-timeline-duration">Feb 2022 - Aug 2023</div>
                  <h4 className="st-resume-timeline-subtitle">Hyderabad, India</h4>
                  <div className="st-resume-timeline-text">
                    <p>
                      Managed CI/CD pipelines, Jenkins automation, deployments, and server migrations while ensuring secure and efficient application delivery.<br />
                      Implemented DevSecOps practices, build and release automation, and cloud/server optimizations to enhance performance and reliability.
                    </p>
                  </div>
                </div>

                <div className="st-resume-timeline">
                  <h3 className="st-resume-timeline-title">Software Engineer</h3>
                  <div className="st-resume-timeline-duration">Jan 2024 - Aug 2024</div>
                  <h4 className="st-resume-timeline-subtitle">Bangalore, India</h4>
                  <div className="st-resume-timeline-text">
                    <p>
                      Developed and maintained Grafana dashboards and Prometheus monitoring for infrastructure, applications, and project metrics.<br/>
                      Created Sphinx documentation, integrated monitoring alerts, and optimized visualization and metrics collection for performance tracking.
                    </p>
                  </div>
                </div>
                
              </div>
            </div>
            <div className="st-height-b100 st-height-lg-b80"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
