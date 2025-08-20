# Vagrant with VirtualBox Provider – Customizing Resources
---

Vagrant makes it easy to create reproducible development environments. When using VirtualBox as the provider, you can customize the virtual machine’s settings such as memory, CPU count, and name to suit your project needs.

In this blog, we’ll set up Vagrant with VirtualBox and configure resources individually step by step.

### ✅ Prerequisites

Make sure you have the following installed:

- [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
- [Vagrant](https://developer.hashicorp.com/vagrant/install#linux)

Check installation with:

```bash
vagrant -v
virtualbox --help
```

### Step 1: Initialize a Vagrant Project

```bash
mkdir vagrant_virtualbox_custom
cd vagrant_virtualbox_custom
vagrant init
```
This creates a Vagrantfile in the directory.

### Step 2: Set the Base Box

Open the Vagrantfile and define a base Ubuntu box:

```bash
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"
end
```

### Step 3: Configure VirtualBox Memory

Add memory configuration:

```bash
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "2048"
  end
end
```

![virtualbox memory](/blogs/images/virtualbox-memory.png)

### Step 4: Configure VirtualBox CPU

Set the number of CPUs:

```bash
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"

  config.vm.provider "virtualbox" do |vb|
    vb.cpus = 2
  end
end
```

![virtualbox cpu](/blogs/images/virtualbox-cpu.png)

### Step 5: Configure VM Name

Give your VM a friendly name:

```bash
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"

  config.vm.provider "virtualbox" do |vb|
    vb.name = "custom-ubuntu-vm"
  end
end
```

![virtualbox name](/blogs/images/virtualbox-name.png)

Let’s talk about how I named my VM, *Vagrant-VLDOCSRV091*, in another blog post.

### Step 6: Start the VM

Bring up the VM:

```bash
vagrant up
```

SSH into it:

```bash
vagrant ssh
```

### Step 7: Manage the VM

Some useful commands:

```bash
vagrant halt     # stop the VM
vagrant suspend  # pause the VM
vagrant resume   # resume from suspend
vagrant destroy  # delete the VM
```

### Advantages of Configuring VirtualBox Provider

- Fine-grained control over VM resources

- Ability to simulate production-like environments

- Easier collaboration with team members using the same setup


### 🎯 Conclusion

Using Vagrant with VirtualBox as a provider gives developers full control over their virtual machines. By customizing memory, CPU, and VM name individually, you can tailor each environment to match your project’s requirements.

Start experimenting with these configurations today and optimize your development workflow 🚀