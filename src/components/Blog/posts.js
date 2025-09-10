const blogs = [
  {
    id: 1,
    slug: "getting-started-with-devops",
    title: "Getting Started with DevOps",
    image: "/blogs/images/getting-started-with-devops.png",
    date: "August 18, 2025",
    read_time: "3",
    excerpt: "Kicking off my DevOps blog series! Here’s a quick guide to the essential tools and technologies every DevOps enthusiast should know.",
    tag: "General"
  },
  {
    id: 2,
    slug: "vagrant-cli",
    title: "Vagrant Command-Line Interface",
    image: "/blogs/images/vagrant-cli.png",
    date: "August 19, 2025",
    read_time: "6",
    excerpt: "Vagrant Command-Line interface through which almost all interaction with Vagrant is done.",
    tag: "Vagrant"
  },
  {
    id: 3,
    slug: "vagrant-installation-on-ubuntu",
    title: "Install Vagrant on Ubuntu",
    image: "/blogs/images/vagrant-installation-on-ubuntu.png",
    date: "August 19, 2025",
    read_time: "4",
    excerpt: "Learn how to install and set up Vagrant on Ubuntu step-by-step for managing development environments with ease.",
    tag: "Vagrant"
  },
  {
    id: 4,
    slug: "vagrant-with-docker-provider",
    title: "Vagrant with the Docker Provider",
    image: "/blogs/images/vagrant-with-docker-provider.png",
    date: "August 20, 2025",
    read_time: "5",
    excerpt: "Discover how to use Vagrant with Docker as a provider to quickly spin up and manage containerized environments with ease.",
    tag: "Vagrant"
  },
  {
    id: 5,
    slug: "vagrant-virtualbox-provider",
    title: "Vagrant with the VirtualBox Provider",
    image: "/blogs/images/vagrant-virtualbox-provider.png",
    date: "August 20, 2025",
    read_time: "5",
    excerpt: "Learn how to use Vagrant with the VirtualBox provider to create and manage full virtual machines for reproducible development environments.",
    tag: "Vagrant"
  },
  {
    id: 6,
    slug: "vagrant-virtualbox-custom-settings",
    title: "Vagrant with VirtualBox: Custom VM Settings",
    image: "/blogs/images/vagrant-virtualbox-custom-settings.png",
    date: "August 20, 2025",
    read_time: "6",
    excerpt: "Guide to configuring custom VirtualBox settings in Vagrant such as memory, CPUs and VM Name.",
    tag: "Vagrant"
  },
  {
    id: 7,
    slug: "vagrant-virtualbox-advanced-settings",
    title: "Vagrant with VirtualBox: advanced VM Settings",
    image: "/blogs/images/vagrant-virtualbox-advanced-settings.png",
    date: "August 20, 2025",
    read_time: "6",
    excerpt: "Learn how to customize VirtualBox VM settings in Vagrant including memory, CPUs, clipboard, drag-and-drop, VRAM, and provisioning.",
    tag: "Vagrant"
  },
  {
    id: 8,
    slug: "server-naming-convention",
    title: "Server Naming Convention: Best Practices and Examples",
    image: "/blogs/images/server-naming-convention.png",
    date: "August 20, 2025",
    read_time: "5",
    excerpt: "Understand server naming conventions with examples like PWAPPSRV003. Learn how to standardize server names using Physical/Virtual type, OS brand, device function, and numbering.",
    tag: "Networking"
  },
  {
    "id": 9,
    "slug": "vagrant-shell-provisioner",
    "title": "Getting Started with Vagrant Shell Provisioner",
    "image": "/blogs/images/vagrant-shell-provisioner.png",
    "date": "August 21, 2025",
    "read_time": "6",
    "excerpt": "Learn how to use Vagrant's Shell Provisioner to automate virtual machine setup with inline commands and external scripts. Includes examples for installing software, configuring services, and running setup tasks.",
    "tag": "Vagrant"
  },
    {
    "id": 10,
    "slug": "vagrant-file-provisioner",
    "title": "Getting Started with Vagrant File Provisioner",
    "image": "/blogs/images/vagrant-file-provisioner.png",
    "date": "August 21, 2025",
    "read_time": "6",
    "excerpt": "Learn how to use Vagrant's File Provisioner to copy files and directories from your host system to the VM. Includes examples for single files, directories, and combining with the Shell Provisioner.",
    "tag": "Vagrant"
  },
  {
    "id": 11,
    "slug": "vagrant-ansible-provisioner",
    "title": "Getting Started with Vagrant Ansible Provisioner",
    "image": "/blogs/images/vagrant-ansible-provisioner.png",
    "date": "August 22, 2025",
    "read_time": "5",
    "excerpt": "Learn how to use Vagrant's Ansible Provisioner to automate VM setup with Ansible playbooks. Includes examples of installing Nginx, updating packages, and ensuring services are running.",
    "tag": "Vagrant"
  },
  {
    "id": 12,
    "slug": "yaml-made-simple",
    "title": "YAML Made Simple: The Complete Beginner’s Guide",
    "image": "/blogs/images/yaml-made-simple.png",
    "date": "August 24, 2025",
    "read_time": "6",
    "excerpt": "A beginner-friendly guide to YAML covering basics, variables, anchors, loops, and real-world DevOps examples with Ansible, Docker Compose, and Kubernetes.",
    "tag": "Yaml"
  },
  {
    "id": 13,
    "slug": "vagrant-multivm-setup",
    "title": "Vagrant Multi-VM Setup: Build Your Own Lab Environment",
    "image": "/blogs/images/vagrant-multivm-setup.png",
    "date": "August 25, 2025",
    "read_time": "5",
    "excerpt": "Step-by-step guide to building a Vagrant multi-VM lab with Ubuntu and Windows servers, automated provisioning scripts, and networking for DevOps learning and testing.",
    "tag": "Vagrant"
  },
  {
    "id": 14,
    "slug": "install-ansible-using-pip",
    "title": "Install Ansible on Ubuntu Using pip",
    "image": "/blogs/images/install-ansible-using-pip.png",
    "date": "August 26, 2025",
    "read_time": "3",
    "excerpt": "Learn how to install Ansible on Ubuntu step by step using Python pip. This guide covers prerequisites, environment setup, SSH configuration, and running your first Ansible ping command for automation testing.",
    "tag": "Ansible"
  },
  {
    "id": 15,
    "slug": "ansible-apt-module",
    "title": "Mastering the Ansible apt Module",
    "image": "/blogs/images/ansible-apt-module.png",
    "date": "August 26, 2025",
    "read_time": "4",
    "excerpt": "Learn how to use the Ansible apt module to automate package management on Debian and Ubuntu systems. This guide covers installing, updating, and removing packages with real-world playbook examples.",
    "tag": "Ansible"
  },
  {
    "id": 16,
    "slug": "ansible-yum-module",
    "title": "Mastering the Ansible yum Module",
    "image": "/blogs/images/ansible-yum-module.png",
    "date": "August 27, 2025",
    "read_time": "4",
    "excerpt": "Learn how to use the Ansible yum module to install, update, and remove packages on RHEL-based systems like CentOS, Rocky Linux, and Fedora. This guide covers parameters, examples, and best practices for efficient package management.",
    "tag": "Ansible"
  },
  {
    "id": 17,
    "slug": "ansible-package-module",
    "title": "How to Manage Packages with Ansible: A Complete Guide",
    "image": "/blogs/images/ansible-package-module.png",
    "date": "August 29, 2025",
    "read_time": "5",
    "excerpt": "Learn how to use the Ansible package module for consistent package management across multiple Linux distributions. This guide covers installation, removal, updating, and using conditions with real-world examples.",
    "tag": "Ansible"
  },
  {
    "id": 18,
    "slug": "ansible-service-module",
    "title": "Ansible Service Module Explained with Real-Time Examples",
    "image": "/blogs/images/ansible-service-module.png",
    "date": "August 29, 2025",
    "read_time": "5",
    "excerpt": "Learn how to use the Ansible service module to start, stop, restart, and enable services across different Linux distributions. This guide provides real-world playbook examples and best practices for effective service management.",
    "tag": "Ansible"
  },
  {
    "id": 19,
    "slug": "ansible-systemd-module",
    "title": "Managing Systemd Services with Ansible: The Modern Approach",
    "image": "/blogs/images/ansible-systemd-module.png",
    "date": "August 29, 2025",
    "read_time": "5",
    "excerpt": "Master managing systemd services with Ansible. Learn how to start, stop, restart, enable, reload, and mask services in modern Linux environments with practical playbook examples and best practices.",
    "tag": "Ansible"
  },
  {
    "id": 20,
    "slug": "ansible-user-module",
    "title": "Automating User Management with Ansible User Module",
    "image": "/blogs/images/ansible-user-module.png",
    "date": "August 30, 2025",
    "read_time": "6",
    "excerpt": "Simplify Linux user administration with Ansible's user module. Learn how to manage users, groups, passwords, and SSH keys - including secure password hashing with python3-passlib - through practical examples and best practices.",
    "tag": "Ansible"
  },
  {
    "id": 21,
    "slug": "ansible-file-module",
    "title": "Automating Files & Permissions with Ansible File Module",
    "image": "/blogs/images/ansible-file-module.png",
    "date": "September 2, 2025",
    "read_time": "6",
    "excerpt": "Learn how to automate file and directory management with Ansible's file module. From creating and deleting files to setting permissions, ownership, and symbolic links — master real-world playbook examples and best practices for managing files at scale.",
    "tag": "Ansible"
  },
  {
    "id": 22,
    "slug": "linux-networking-commands",
    "title": "20 Essential Linux Networking Commands for Beginners",
    "image": "/blogs/images/linux-networking-commands.png",
    "date": "September 3, 2025",
    "read_time": "7",
    "excerpt": "Master essential Linux networking commands that every sysadmin should know. From checking network interfaces and monitoring connections to troubleshooting DNS, routing, and firewalls — this guide covers the top 20 commands with practical examples.",
    "tag": "Linux"
  },
  {
    "id": 23,
    "slug": "ansible-copy-module",
    "title": "Copying Files Across Servers with Ansible Copy Module",
    "image": "/blogs/images/ansible-copy-module.png",
    "date": "September 5, 2025",
    "read_time": "6",
    "excerpt": "Learn how to use the Ansible copy module to transfer files, set permissions, and manage backups across servers. This guide includes practical playbook examples to simplify file management and automation.",
    "tag": "Ansible"
  },
  {
    "id": 24,
    "slug": "ansible-unarchive-module",
    "title": "Ansible Archive vs Unarchive: Automating Compression & Extraction",
    "image": "/blogs/images/ansible-unarchive-module.png",
    "date": "September 5, 2025",
    "read_time": "8",
    "excerpt": "Explore the differences between Ansible's archive and unarchive modules. Learn how to automate file compression and extraction with practical use cases, parameters, and playbook examples for backups, packaging, and deployments.",
    "tag": "Ansible"
  },
  {
    "id": 25,
    "slug": "ansible-error-handling",
    "title": "Mastering Error Handling in Ansible: Register, Failed_when, and Block/Rescue/Always",
    "image": "/blogs/images/ansible-error-handling.png",
    "date": "September 5, 2025",
    "read_time": "4",
    "excerpt": "Learn how to handle errors in Ansible like a pro using register, failed_when, and block/rescue/always. Make your playbooks smarter, more resilient, and fault-tolerant with real-world examples.",
    "tag": "Ansible"
  },
  {
    "id": 26,
    "slug": "ansible-docker-image-module",
    "title": "Managing Docker Images with Ansible Docker_Image Module",
    "image": "/blogs/images/ansible-docker-image-module.png",
    "date": "September 9, 2025",
    "read_time": "5",
    "excerpt": "Learn how to build, push, pull, archive, and load Docker images using the Ansible docker_image module. Step-by-step playbooks for Node.js apps, Nginx, and image lifecycle management.",
    "tag": "Ansible"
  },
  {
    "id": 27,
    "slug": "ansible-docker-container-module",
    "title": "Managing Docker Containers with Ansible Docker_Container Module",
    "image": "/blogs/images/ansible-docker-container-module.png",
    "date": "September 9, 2025",
    "read_time": "6",
    "excerpt": "Automate Docker container management with Ansible's docker_container module. Learn how to run, stop, remove, and restart containers with clear playbook examples for real-world use cases.",
    "tag": "Ansible"
  },
  {
    "id": 28,
    "slug": "ansible-aws-ec2-instance",
    "title": "Provisioning AWS EC2 Instances with Ansible EC2_Instance Module",
    "image": "/blogs/images/ansible-aws-ec2-instance.png",
    "date": "September 9, 2025",
    "read_time": "6",
    "excerpt": "Learn how to automate provisioning AWS EC2 instances using Ansible's ec2_instance module. Step-by-step playbooks for launching, tagging, and terminating EC2 instances with real-world examples.",
    "tag": "Ansible"
  },
  {
    "id": 29,
    "slug": "ansible-roles-and-galaxy",
    "title": "Ansible Roles & Galaxy: Structuring and Reusing Automation",
    "image": "/blogs/images/ansible-roles-and-galaxy.png",
    "date": "September 10, 2025",
    "read_time": "6",
    "excerpt": "Discover how Ansible Roles help you organize automation into clean, reusable components, and how Ansible Galaxy enables sharing and reusing pre-built roles across projects.",
    "tag": "Ansible"
  }

];

export default blogs;