import React from "react";
import devops from "../../assets/devops.png";
import "./About.css";

const About = () => {
  return (
    <section className="container-fluid about-section" id="about">
      <div className="container">
            <div className="st-section-heading st-style1">
              <h4 className="st-section-heading-title">About</h4>
            </div>

            <div className="row align-items-center mt-7 mb-5">
                <div className="col-md-6 px-5 text-center mb-4 mb-md-0">
                <img src={devops} className="w-100 about-image" alt="DevOps" />
                </div>

                <div
                className="col-md-6 px-5 about-content"
                data-aos="fade-up"
                data-aos-duration="1000"
                >
                <h2>Hi There! I’m <span className="highlight"><br/>Narendra Kaduru</span></h2>
                <h4>DevOps Engineer</h4>
                <p>
                I'm an enthusiastic DevOps engineer passionate about creating systems that are secure, scalable, and productive. From CI/CD pipelines to infrastructure automation, I enjoy reducing costs, speeding up delivery, and making sure deployments go smoothly.
                </p>
                <p>
                My goal is to close the gap between operations and development to ensure teams can produce high-caliber products more quickly. I enjoy transforming problems into elegant solutions, whether it be automating builds, keeping an eye on systems, or deploying to the cloud.
                </p>
                </div>
            </div>
      </div>
    </section>
  );
};

export default About;
