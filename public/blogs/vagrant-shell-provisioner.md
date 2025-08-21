# Getting Started with Vagrant Shell Provisioner
---

When working with Vagrant, one of its most powerful features is **provisioning**-the ability to automatically configure your virtual machines (VMs) right after they are created. Provisioners help you install software, configure services, and automate setup tasks without having to manually log in to the VM.

Among all provisioners that Vagrant supports, the **Shell Provisioner** is the simplest and most flexible. It allows you to run shell scripts or inline commands inside your VM during *vagrant up* or *vagrant provision*.

### What is Vagrant Shell Provisioner?

The Shell Provisioner runs shell commands or scripts inside the guest VM. This is useful when you want to:

- Install packages

- Configure system files

- Start or enable services

- Set environment variables

- Run any command-line tasks

It’s often used for quick setup tasks or when you don’t want to bring in a full configuration management tool like Ansible, Puppet, or Chef.

### Types of Shell Provisioning in Vagrant

Vagrant supports two main ways of using the Shell Provisioner:

#### 1. Inline Shell Commands

Run simple shell commands directly in your Vagrantfile.

```bash
Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-22.04"
  
  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update
    sudo apt-get install -y nginx
    echo "Hello from Vagrant Shell Provisioner!" | sudo tee /var/www/html/index.html
  SHELL
end
```

In this example:

- The package list is updated

- Nginx is installed

- A custom index page is created

When you run *vagrant up*, these steps will automatically execute.

#### 2. External Shell Scripts

If you already have a script file, you can include it directly.

##### Project Structure

```text
vagrant-shell-provisioner/
├── Vagrantfile
└── setup.sh
```

```bash
Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-22.04"
  
  config.vm.provision "shell", path: "setup.sh"
end
```

And in your setup.sh file:

```bash
#!/bin/bash
apt-get update
apt-get install -y apache2
systemctl enable apache2
systemctl start apache2
```

This approach is cleaner when you have longer setup tasks.

### Running Provisioners

You can trigger the Shell Provisioner in different ways:

- Automatically when creating the VM:

```bash
vagrant up
```

- Re-run provisioning on an existing VM:

```bash
vagrant provision
```

If you change the script and want to test it again, just rerun provisioning without destroying the VM.

### 🎯 Conclusion

The Vagrant Shell Provisioner is an excellent starting point for automating your VM setup. Whether you’re installing a web server, configuring a database, or setting up developer tools, you can easily script it using shell commands.

If you’re new to Vagrant, I recommend starting with shell provisioning to quickly understand the power of automated VM setup. Later, you can expand to other provisioners like Ansible or Puppet as your infrastructure grows.