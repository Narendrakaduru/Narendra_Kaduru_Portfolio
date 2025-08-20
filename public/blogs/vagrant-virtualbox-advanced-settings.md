# Vagrant with VirtualBox Provider – Advanced Customization
---

When working with Vagrant and VirtualBox, a plain configuration is often not enough for production-like environments. You might want to control networking, allocate resources, and tweak VirtualBox features such as clipboard sharing, drag-and-drop, boot order, or even add a custom description.

In this blog, we’ll walk through an advanced Vagrant configuration that provisions an Ubuntu 22.04 VM with fine-tuned VirtualBox settings.

### ✅ Prerequisites

Make sure you have the following installed:

- Vagrant installed (latest version)
- VirtualBox installed
- A basic understanding of Vagrantfiles

### Example Vagrantfile with Advanced Customizations

Here’s a sample Vagrantfile that defines a VM with multiple customizations:

```bash
config.vm.define "srv4" do |srv4|
  # Base image
  srv4.vm.box = "bento/ubuntu-22.04"

  # Networking
  srv4.vm.network "public_network", ip: "192.168.1.94"

  # Hostname
  srv4.vm.hostname = "vldocsrv094"

  # VirtualBox provider settings
  srv4.vm.provider "virtualbox" do |vb|
    vb.name = "Vagrant-VLDOCSRV094"  # VM name in VirtualBox
    vb.memory = 6144                 # Allocate 6 GB RAM
    vb.cpus = 4                      # Allocate 4 CPUs

    # Clipboard & Drag-and-Drop
    vb.customize ["modifyvm", :id, "--clipboard", "bidirectional"]
    vb.customize ["modifyvm", :id, "--draganddrop", "bidirectional"]

    # Video RAM
    vb.customize ["modifyvm", :id, "--vram", "16"]

    # Boot order customization
    vb.customize [
      "modifyvm", :id,
      "--boot1", "dvd",
      "--boot2", "disk"
    ]

    # VM description
    vb.customize ["modifyvm", :id, "--description", "IP: 192.168.1.94"]
  end
end
```

### Key Customizations Explained

#### 1. Networking

We assign a static public IP (192.168.1.94) to ensure the VM is always reachable on the same address. This is useful for multi-VM setups, or when the VM needs to act as a server.

![virtualbox ip](/blogs/images/vagrant-advanced-ip.png)

#### 2. VirtualBox Name & Hostname

- VM Name (vb.name) → Appears in VirtualBox GUI, making it easier to identify among multiple VMs.
  
  ![virtualbox name](/blogs/images/vagrant-advanced-name.png)
  
- Hostname (srv4.vm.hostname) → Internal identifier inside the guest OS.
  
  ![virtualbox ip](/blogs/images/vagrant-advanced-ip.png)

This helps differentiate environments (e.g., dev, test, prod).

#### 3. Resource Allocation

- Memory (vb.memory): Allocate 6 GB RAM for smooth performance.
  
- CPUs (vb.cpus): Assign 4 vCPUs for faster builds and multitasking.

Tuning these ensures your VM runs workloads without lag.

#### 4. Clipboard & Drag-and-Drop

By default, Vagrant VMs don’t allow easy sharing. Enabling:

- Bidirectional clipboard → Copy/paste between host and VM.
  
- Bidirectional drag-and-drop → Drag files directly from your host to VM and vice versa.

![virtualbox clipboard](/blogs/images/vagrant-advanced-clipboard.png)

This improves developer productivity significantly.

#### 5. Video Memory (VRAM)

Set 16 MB VRAM for GUI-based VMs. While not critical for CLI-only servers, it improves responsiveness in GUI sessions.

![virtualbox vram](/blogs/images/vagrant-advanced-vram.png)

#### 6. Boot Order Customization

Custom boot sequence:

- DVD first → Allows easy booting from ISO (useful for testing).
  
- Disk second → Default disk boot after ISO testing.

![virtualbox BO](/blogs/images/vagrant-advanced-bo.png)

This mirrors real-world BIOS/UEFI boot setups.


#### 7. VM Description

Adding a description helps you remember the purpose of the VM. Here, it shows the static IP (192.168.1.94), making it quick to reference in VirtualBox.

![virtualbox DS](/blogs/images/vagrant-advanced-ds.png)


### Why Use These Customizations?

- 💻 Improved Development Experience → Clipboard and drag-and-drop save time.

- ⚙️ Better Performance → Proper memory/CPU allocation reduces slowdowns.

- 🗂️ Organized VM Management → Names, hostnames, and descriptions make identifying VMs easier.

- 🔄 Flexible Boot Options → Quickly switch between ISO-based installs and disk boots.


### 🎯 Conclusion

With a few extra lines in your Vagrantfile, you can transform a basic VM into a fully customized development server. These tweaks make your environment more powerful, efficient, and closer to real-world setups.

Next time you spin up a Vagrant box, don’t settle for defaults — customize it for your workflow! 🚀