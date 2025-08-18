import React from "react";
import "./Projects.css";

const projects = [
  {
    title: "ZapBuy E-Commerce",
    description: "Full-stack e-commerce application with Angular frontend and Node.js backend and MongoDB.",
    github: "https://github.com/Narendrakaduru/zapbuy"
  },
  {
    title: "DevOps Compose Stack",
    description: "A collection of Docker Compose files to deploy and configure various self-hosted services (e.g., Jenkins, Prometheus, OpenVPN, Nextcloud, Plex, Home Assistant) with ease.",
    github: "https://github.com/Narendrakaduru/Docker-Compose.git"
  },
  {
    title: "Vagrant Infra Provisioning",
    description: "Vagrant infrastructure provisioning scripts for easy, consistent environment setup using VirtualBox.",
    github: "https://github.com/Narendrakaduru/vagrant-vb-infra.git"
  },
  {
    title: "Container Hostname Info App",
    description: "A lightweight Node.js application (Express + Docker) that exposes a REST endpoint to display the hostname of the running container, both on a static HTML page and via a JSON API.",
    github: "https://github.com/Narendrakaduru/container_info_app"
  },
  {
    title: "Ansible Playbooks Collection",
    description: "A curated set of Ansible playbooks and roles for automating infrastructure tasks such as EC2 resource management, Apache web server provisioning, Java/Tomcat installation, user and group management, monitoring metrics, and reusable looping/conditional patterns.",
    github: "https://github.com/Narendrakaduru/Ansible-Playbooks.git"
  },
  {
    title: "Automated VirtualBox VM Management",
    description: "A collection of scripts and Vagrant configuration files to automate VirtualBox VM creation, destruction, and maintenance. Simplifies VM lifecycle management for development and testing environments.",
    github: "https://github.com/Narendrakaduru/automate_Virtualbox_vm.git"
  },
  {
    title: "Flyway Migration",
    description: "Flyway database migrations - includes sample migration scripts and test configurations using Flyway’s API.",
    github: "https://github.com/Narendrakaduru/flyway_test.git"
  },
  {
    title: "Ansible CloudFormation Toolkit",
    description: "A hybrid Ansible and AWS CloudFormation setup enabling automated provisioning and configuration of cloud infrastructure with reusable templates and workflows.",
    github: "https://github.com/Narendrakaduru/ans_cft.git"
  }
];

export default function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="st-height-b100 st-height-lg-b80"></div>
      <div className="container">
        <div className="st-section-heading st-style1">
            <h4 className="st-section-heading-title">Projects</h4>
        </div>

        <div className="row align-items-center mt-7 mb-5w">
                <div className="projects-container">
                    {projects.map((project, index) => (
                    <div className="project-card" key={index}>
                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-description">{project.description}</p>
                        <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github"
                        >
                        View on GitHub
                        </a>
                    </div>
                    ))}
            </div>
        </div>
      </div>
    </section>
  );
}
