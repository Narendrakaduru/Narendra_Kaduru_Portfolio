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
  }

];

export default blogs;