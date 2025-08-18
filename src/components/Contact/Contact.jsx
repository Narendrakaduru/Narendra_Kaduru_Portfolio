import React, { useRef } from "react";
import emailjs from "emailjs-com";
import "./Contact.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_8ei1rhg",
        "template_wtpf6hn",
        form.current,
        "FF_ZQCa33pdeMrO0s"
      )
      .then(
        (result) => {
          alert("Message sent successfully!");
          e.target.reset();
        },
        (error) => {
          console.error(error.text);
          alert("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <section className="st-section contact-section" id="contact">
      <div className="container">
        <div className="st-height-b100 st-height-lg-b80"></div>

        <div className="st-section-heading st-style1">
          <h4 className="st-section-heading-title">Contact Me</h4>
        </div>

        <div className="row mt-7">
          {/* Contact Form */}
          <div className="col-md-6">
            <h3 className="st-contact-title">Just say Hello</h3>
            <form ref={form} onSubmit={sendEmail} className="st-contact-form">
              <div className="st-form-field">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="st-form-field">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  required
                />
              </div>

              <div className="st-form-field">
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  name="subject"
                  placeholder="Your Subject"
                  required
                />
              </div>

              <div className="st-form-field">
                <textarea
                  className="form-control"
                  id="message"
                  rows="4"
                  name="message"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>

              {/* Hidden reply_to field for direct reply */}
              <input type="hidden" name="reply_to" value="{{email}}" />

              <button type="submit" className="btn-contact">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="col-md-6">
            <h3 className="st-contact-title">Contact Info</h3>
            <div className="contact-info">
              <div className="st-single-contact-info">
                <div className="st-icon-wrap">
                  <i className="bi bi-envelope-fill"></i>
                </div>
                <div className="st-single-info-details">
                  <h4>Email</h4>
                  <span>kadurunarendra@gmail.com</span>
                  <span>nanidevops999@gmail.com</span>
                </div>
              </div>
              <div className="st-single-contact-info">
                <div className="st-icon-wrap">
                  <i className="bi bi-telephone-fill"></i>
                </div>
                <div className="st-single-info-details">
                  <h4>Phone</h4>
                  <span>+91 8686768685</span>
                  <span>+91 9398443021</span>
                </div>
              </div>
              <div className="st-single-contact-info">
                <div className="st-icon-wrap">
                  <i className="bi bi-geo-alt-fill"></i>
                </div>
                <div className="st-single-info-details">
                  <h4>Address</h4>
                  <span>Parameshwari Nagar, Mulapet, Nellore</span>
                  <span>Andhra Pradesh, India 524001</span>
                </div>
              </div>
              <div className="st-social-info">
                <div className="st-social-text">
                  Visit my social profile and get connected
                </div>

                <div className="social-container">
                  <ul className="social-icons">
                    <li>
                      <a href="https://www.linkedin.com/in/narendra-kaduru-9b3a49241/">
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/narendra_kaduru/">
                        <i className="fa fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://codepen.io/Narendrakaduru">
                        <i className="fa fa-codepen"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
