import React from "react";
import "./Skills.css";
import jenkins from '../../assets/Skills/Jenkins_logo.png';
import gitlab from '../../assets/Skills/gitlab.png';
import github from '../../assets/Skills/github.png';
import docker from '../../assets/Skills/docker.png';
import kubernetes from '../../assets/Skills/kubernetes.png';
import nginx from '../../assets/Skills/nginx.png';
import ansible from '../../assets/Skills/ansible.png';
import semaphore from '../../assets/Skills/semaphore.png';
import sonar from '../../assets/Skills/sonarqube.png';
import jfrog from '../../assets/Skills/jfrog.png';
import prometheus from '../../assets/Skills/Prometheus.png';
import grafana from '../../assets/Skills/grafana.png';
import terraform from '../../assets/Skills/terraform.png';
import vagrant from '../../assets/Skills/vagrant.png';
import sphinx from '../../assets/Skills/sphinx.png';
import authentik from '../../assets/Skills/authentik.png';

const skills = [
  { name: "JENKINS", img: jenkins },
  { name: "GITLAB", img: gitlab },
  { name: "ANSIBLE", img: ansible },
  { name: "SEMAPHORE", img: semaphore },
  { name: "DOCKER", img: docker },
  { name: "KUBERNETES", img: kubernetes },
  { name: "GITHUB", img: github },
  { name: "NGINX", img: nginx },
  { name: "SONARQUBE", img: sonar },
  { name: "JFROG", img: jfrog },
  { name: "PROMETHEUS", img: prometheus },
  { name: "GRAFANA", img: grafana },
  { name: "TERRAFORM", img: terraform },
  { name: "VAGRANT", img: vagrant },
  { name: "SPHINX", img: sphinx },
  { name: "AUTHENTIK", img: authentik },
];

const Skills = () => {
  

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="st-section-heading st-style1">
          <h4 className="st-section-heading-title">Skills</h4>
        </div>

        <div className="st-height-b25"></div>

        <div className="skills-list">
            {skills.map((skill, index) => (
            <div className="skills-container" key={index}>
                <div className="skill-image">
                <img src={skill.img} alt={skill.name} />
                </div>
                <div className="skill-name">{skill.name}</div>
            </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
