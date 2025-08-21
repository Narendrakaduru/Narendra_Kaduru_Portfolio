# Getting Started with Vagrant File Provisioner

When working with *Vagrant*, provisioning is one of the key features that makes automation possible. Provisioners allow you to automatically configure your virtual machines (VMs) after they are created. Among the various provisioners, the *File Provisioner* is one of the simplest, yet very powerful.

The File Provisioner helps you *copy files and directories* from your host machine to the guest VM. This is useful when you need to transfer configuration files, scripts, application code, or any resources that your VM setup requires.


### What is Vagrant File Provisioner?

The File Provisioner copies files or directories from the host (your local system) to the guest VM (the machine managed by Vagrant). It’s handy when you want to:

- Copy application code into the VM

- Move configuration files (like `.env`, `.conf`)

- Transfer installation scripts or binaries

- Seed the VM with test data

Unlike synced folders (which create a two-way sync between host and guest), the File Provisioner does a one-time copy during provisioning.

### Example: Copying a File

Here’s a simple Vagrantfile that copies a single file:

```bash
Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-22.04"

  # Copy a file from host to guest
  config.vm.provision "file", source: "hello.txt", destination: "/home/vagrant/hello.txt"
end
```

In this example:

- hello.txt must exist in the same folder as your Vagrantfile.
- It will be copied into the guest VM at `/home/vagrant/hello.txt`.

When you run vagrant up, the file is automatically transferred.

### Example: Copying a Directory

You can also copy entire directories:

```bash
Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-22.04"

  # Copy a directory from host to guest
  config.vm.provision "file", source: "./configs", destination: "/home/vagrant/configs"
end
```

Here:

- The local `configs/` folder is copied into `/home/vagrant/configs` inside the VM.
- Great for moving configuration sets, scripts, or application files.

### Combining File and Shell Provisioners

A common pattern is to first copy a script or config file into the VM using the File Provisioner, and then run it with the Shell Provisioner.

```bash
Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-22.04"

  # Copy script into VM
  config.vm.provision "file", source: "setup.sh", destination: "/home/vagrant/setup.sh"

  # Run the script
  config.vm.provision "shell", inline: "bash /home/vagrant/setup.sh"
end
```

### This way:

- setup.sh is moved from your host to the VM.
- Then it’s executed inside the VM to configure software or services.

### 🎯 Conclusion

The Vagrant File Provisioner is a simple but powerful way to move files and directories from your host machine into your guest VM. Whether you’re transferring scripts, configuration files, or small resources, this provisioner helps automate VM setup efficiently.

For more complex workflows, you can combine it with the Shell Provisioner to first copy files and then execute them inside the VM — a common pattern for automated provisioning.