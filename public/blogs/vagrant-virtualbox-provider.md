# How to Use Vagrant with the VirtualBox Provider

Vagrant is a powerful tool that automates the creation and management of virtual machines. While it supports multiple providers, **VirtualBox** is the most common and beginner-friendly choice. Using VirtualBox, you can quickly spin up reproducible environments for development or testing.  

In this guide, we’ll walk through setting up **Vagrant with the VirtualBox provider** on Ubuntu.

---

### ✅ Prerequisites
Before you start, ensure you have:
- Ubuntu system (20.04/22.04) with sudo access  
- [VirtualBox installed](https://www.virtualbox.org/wiki/Linux_Downloads)  
- Vagrant installed (see our [Install Vagrant on Ubuntu Guide](https://narendra-kaduru-portfolio.netlify.app/blog/vagrant-installation-on-ubuntu))

Verify installations:

```bash
vagrant --version
virtualbox --help
```

### Step 1: Create a Project Directory

Start by creating a folder for your Vagrant project:

```bash
mkdir vagrant_virtualbox && cd vagrant_virtualbox
```

### Step 2: Initialize Vagrant

Initialize a Vagrant project with a base box:

```bash
vagrant init ubuntu/bionic64
```

### Step 3: Configure VirtualBox Provider

Open the Vagrantfile and configure VirtualBox settings if needed. Example:

```bash
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/bionic64"
  
  config.vm.provider "virtualbox" do |vb|
    vb.name = "vagrant-ubuntu-vm"
    vb.memory = "2048"
    vb.cpus = 2
  end
end
```

This sets the VM name, RAM, and CPU cores. 

### Step 4: Start the VM

Run the following command to boot up the VM:

```bash
vagrant up
```

Vagrant will download the Ubuntu box if it’s not already available and launch the VirtualBox VM.

### Step 5: Connect to the VM

SSH into the VM:

```bash
vagrant ssh
```

You now have a fully functional Ubuntu environment inside VirtualBox.

### Step 6: Manage the VM

Stop the VM:

```bash
vagrant halt
```

Restart the VM:

```bash
vagrant restart
```

Destroy the VM:

```bash
vagrant destroy -f
```

### 🎯 Conclusion

Using Vagrant with VirtualBox provides a complete, isolated virtual machine for testing, development, or experimenting with different OS setups. It’s a simple way to ensure consistent environments across teams.

With this setup, you can easily create reproducible environments, share Vagrantfiles with your team, and integrate provisioning tools like Ansible, Chef, or Puppet for full automation.

Vagrant with VirtualBox remains a versatile solution for developers who need reliable, isolated environments without manually configuring virtual machines.