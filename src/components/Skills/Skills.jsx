import React from "react";
import "./Skills.css";

import linux from '../../assets/Skills/linux.png';
import windows from '../../assets/Skills/windows.png';
import git from '../../assets/Skills/git.png';
import github from '../../assets/Skills/github.png';
import gitlab from '../../assets/Skills/gitlab.png';
import jenkins from '../../assets/Skills/jenkins.png';

import maven from '../../assets/Skills/maven.png';
import sonar from '../../assets/Skills/sonarqube.png';
import jfrog from '../../assets/Skills/jfrog.png';
import ansible from '../../assets/Skills/ansible.png';
import molecule from '../../assets/Skills/molecule-1.png';
import semaphore from '../../assets/Skills/semaphore.png';

import docker from '../../assets/Skills/docker.png';
import kubernetes from '../../assets/Skills/kubernetes.png';
import portainer from '../../assets/Skills/portainer.png';
import terraform from '../../assets/Skills/terraform.png';
import packer from '../../assets/Skills/packer.png';
import vagrant from '../../assets/Skills/vagrant.png';

import tomcat from '../../assets/Skills/tomcat.png';
import nginx from '../../assets/Skills/nginx.png';
import iis from '../../assets/Skills/iis.png';
import prometheus from '../../assets/Skills/Prometheus.png';
import grafana from '../../assets/Skills/grafana.png';
import argocd from '../../assets/Skills/argocd.png';

import authentik from '../../assets/Skills/authentik.png';
import sphinx from '../../assets/Skills/sphinx.png';
import markdown from '../../assets/Skills/markdown.png';
import yaml from '../../assets/Skills/yaml.png';
import bash from '../../assets/Skills/bash.png';
import powershell from '../../assets/Skills/powershell.png';

import bandit from '../../assets/Skills/bandit.png';
import scout from '../../assets/Skills/scout.png';
import flyway from '../../assets/Skills/flyway.png';
import groovy from '../../assets/Skills/groovy.png';
import python from '../../assets/Skills/python.png';



const skills = [
  { name: "LINUX", img: linux },
  { name: "WINDOWS", img: windows },
  { name: "GIT", img: git },
  { name: "GITHUB", img: github },
  { name: "GITLAB", img: gitlab },
  { name: "JENKINS", img: jenkins },

  { name: "MAVEN", img: maven },
  { name: "SONARQUBE", img: sonar },
  { name: "JFROG", img: jfrog },
  { name: "ANSIBLE", img: ansible },
  { name: "MOLECULE", img: molecule },
  { name: "SEMAPHORE", img: semaphore },
  
  { name: "DOCKER", img: docker },
  { name: "KUBERNETES", img: kubernetes },
  { name: "PORTAINER", img: portainer },
  { name: "TERRAFORM", img: terraform },
  { name: "PACKER", img: packer },
  { name: "VAGRANT", img: vagrant },
  
  { name: "TOMCAT", img: tomcat },
  { name: "NGINX", img: nginx },
  { name: "IIS", img: iis },
  { name: "PROMETHEUS", img: prometheus },
  { name: "GRAFANA", img: grafana },
  { name: "ARGOCD", img: argocd },
    
  { name: "AUTHENTIK", img: authentik },
  { name: "SPHINX", img: sphinx },
  { name: "MARKDOWN", img: markdown },
  { name: "YAML", img: yaml },
  { name: "BASH", img: bash },
  { name: "POWERSHELL", img: powershell },

  { name: "BANDIT", img: bandit },
  { name: "SCOUT", img: scout },
  { name: "FLYWAY", img: flyway },
  { name: "GROOVY", img: groovy },
  { name: "PYTHON", img: python },
  
  
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
