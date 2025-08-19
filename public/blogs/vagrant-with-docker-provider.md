# How to Use Vagrant with the Docker Provider

[Vagrant](https://developer.hashicorp.com/vagrant) is commonly used with VirtualBox or VMware to manage virtual machines. But did you know Vagrant also supports **Docker as a provider**?  
This allows you to quickly spin up and manage Docker containers in a reproducible way, just like virtual machines.  

In this guide, we’ll explore how to use **Vagrant with the Docker provider** on Ubuntu.

---

### ✅ Prerequisites
Before you begin, make sure you have:
- Ubuntu system (20.04/22.04) with sudo access  
- [Docker installed](https://docs.docker.com/engine/install/ubuntu/) and running  
- Vagrant installed (see our [Install Vagrant on Ubuntu Guide](https://narendra-kaduru-portfolio.netlify.app/blog/vagrant-installation-on-ubuntu))  

Test Docker with:

```bash
docker --version
```

Test Vagrant with:

```bash
vagrant --version
```

---

### Step 1: Create a Project Directory
Make a new folder for your project:

```bash
mkdir vagrant_docker
cd vagrant_docker
```

---

### Step 2: Initialize Vagrant with Docker Provider
Initialize Vagrant with a basic config:

```bash
vagrant init
```

This creates a `Vagrantfile`. Edit it to use **Docker as the provider**:

```ruby
Vagrant.configure("2") do |config|
  config.vm.provider "docker" do |d|
    d.image = "ubuntu:20.04"
    d.name  = "vagrant-docker-ubuntu"
    d.cmd   = ["/bin/bash", "-l"]
  end
end
```

---

### Step 3: Start the Docker Container with Vagrant
Run:

```bash
vagrant up --provider=docker
```

This will pull the `ubuntu:20.04` Docker image if not already available and start the container.

---

### Step 4: SSH into the Container
You can connect to the container using:

```bash
vagrant ssh
```

This provides an interactive shell inside the running Docker container.

---

### Step 5: Manage the Container
- To stop the container:

```bash
vagrant halt
```

- To remove the container:

```bash
vagrant destroy -f
```

---

### Step 6: Using Custom Docker Images
You can also use your own Docker images or ones from Docker Hub. Example:

```ruby
Vagrant.configure("2") do |config|
  config.vm.provider "docker" do |d|
    d.image = "nginx:latest"
    d.name  = "vagrant-docker-nginx"
    d.ports = ["8080:80"]
  end
end
```

Run:

```bash
vagrant up --provider=docker
```

Now open **http://localhost:8080** in your browser — you’ll see Nginx running inside the Vagrant-managed container.

---

### 🎯 Conclusion
Using **Vagrant with Docker** is a powerful way to manage containerized environments consistently.  
It gives you the simplicity of Docker with the provisioning and reproducibility of Vagrant.  

👉 Next, we’ll explore **multi-container setups with Vagrant and Docker** for more complex environments.  
