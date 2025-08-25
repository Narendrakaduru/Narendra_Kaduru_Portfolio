# Building a Multi-VM Lab Environment with Vagrant
---

When working in DevOps, cloud, or systems engineering, you often need **multiple servers** to simulate production-like environments. Instead of spinning up expensive cloud resources, you can use **Vagrant + VirtualBox** to quickly create a cluster of VMs on your laptop.

In this guide, we’ll build a **multi-VM lab** with Ubuntu and Windows machines, provisioned automatically with shell scripts.

### 🔧 What is Vagrant?

Vagrant is an **open-source tool** for building and managing virtual machine environments. It uses simple configuration files (Vagrantfile) and providers like VirtualBox, VMware, or Hyper-V.

With Vagrant, you can:

- Define multiple VMs in one file
- Automate provisioning (e.g., install Docker, configure users)
- Reproduce environments across different machines

### Prerequisites

- VirtualBox
- Vagrant

### Multi-VM Setup

We’ll define 3 servers:

- srv1 - ubuntu server
- srv2 - ubuntu desktop
- srv3 - windows

Each server has:

- A static public IP which will be accessable to all your network (192.168.1.91 - 192.168.1.93)
- A hostname (like vldocsrv091)
- VirtualBox customizations (memory, CPU, clipboard, VRAM, etc.)

### Vagrantfile

Here’s a simplified version of the Vagrantfile for multiple VMs:

```bash
Vagrant.configure("2") do |config|

  config.vm.define "srv1" do |srv1|
    srv1.vm.box = "bento/ubuntu-22.04"
    srv1.vm.network "public_network", ip: "192.168.1.91"
    srv1.vm.hostname = "vldocsrv091"
    srv1.vm.provider "virtualbox" do |vb|
      vb.name = "Vagrant-VLDOCSRV091"
      vb.memory = 4096
      vb.cpus = 2
    end
    srv1.vm.provision "shell", path: "scripts/update.sh"
    srv1.vm.provision "shell", path: "scripts/create_user.sh"
    srv1.vm.provision "shell", path: "scripts/docker.sh"
  end

  config.vm.define "srv2" do |srv2|
    srv2.vm.box = "gusztavvargadr/ubuntu-desktop-2204-lts"
    srv2.vm.network "public_network", ip: "192.168.1.92"
    srv2.vm.hostname = "vldocsrv092"
    srv2.vm.provider "virtualbox" do |vb|
      vb.name = "Vagrant-VLDOCSRV092"
      vb.memory = 4096
      vb.cpus = 2
    end
  end

  config.vm.define "srv3" do |srv3|
    srv3.vm.box = "gusztavvargadr/windows-10"
    srv3.vm.network "public_network", ip: "192.168.1.93"
    srv3.vm.hostname = "vldocsrv093"
    srv3.vm.provider "virtualbox" do |vb|
      vb.name = "Vagrant-VLDOCSRV093"
      vb.memory = 4096
      vb.cpus = 2
    end
  end

end
```

For the scripts refer [github](https://github.com/Narendrakaduru/vagrant-vb-infra.git)

This way you can spin up all machines at once with:

```bash
vagrant up
```

Or start individual servers:
```bash
vagrant up srv1
vagrant ssh srv1
```

### 🌐 Networking

We’re using public_network with static IPs, so VMs are accessible from the host machine (and other devices on the same LAN). Example:

- 192.168.1.91 - vldocsrv091
- 192.168.1.93 - vldocsrv093

You can ssh into them directly:

```bash
ssh vagrant@192.168.1.91
```

### 🚀 Why Use Multi-VM Vagrant?

- **Learning & Labs** - Create a small Kubernetes cluster, test Ansible playbooks, or practice DevOps tools
- **CI/CD Testing** - Reproduce production-like setups locally
- **Consistency** - Same configuration on any machine, anywhere

### 🎯 Conclusion

With Vagrant, setting up 10+ servers locally is just a matter of a few lines of Ruby in a Vagrantfile. You can create Linux, Windows, and Desktop environments side by side, fully provisioned with Docker and custom users - perfect for DevOps labs, testing, and development.

Try building your own multi-VM environment and automate more with Ansible or Puppet once you’re comfortable with provisioning scripts.