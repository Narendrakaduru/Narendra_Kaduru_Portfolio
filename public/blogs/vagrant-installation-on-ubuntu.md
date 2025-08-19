# How to Install Vagrant on Ubuntu (Step-by-Step Guide)

Vagrant is a popular open-source tool from HashiCorp that simplifies the management of virtualized development environments. With Vagrant, you can quickly spin up reproducible and portable environments using providers like VirtualBox, VMware, Docker, or Hyper-V.  

In this guide, we’ll walk you through installing **Vagrant on Ubuntu (20.04/22.04)**.

---

### ✅ Prerequisites
Before you start, ensure you have:
- A system running Ubuntu 20.04/22.04
- A user account with **sudo** privileges
- Basic knowledge of the Linux terminal

---

### Step 1: Update Your System
It’s always best to update your package lists before installing new software:

```bash
sudo apt update && sudo apt upgrade -y
```

---

### Step 2: Install Dependencies
Vagrant requires some basic dependencies. Install them with:

```bash
sudo apt install -y curl gnupg software-properties-common
```

---

### Step 3: Add HashiCorp GPG Key & Repository
HashiCorp provides an official repository for Vagrant. Add the GPG key:

```bash
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
```

Then add the repository:

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
```

Update package lists:

```bash
sudo apt update
```

---

### Step 4: Install Vagrant
Now install Vagrant:

```bash
sudo apt install vagrant -y
```

---

### Step 5: Verify Installation
Check if Vagrant was installed successfully:

```bash
vagrant --version
```

You should see something like:

```text
Vagrant 2.4.1
```

---

### Step 6: (Optional) Install a Provider
Vagrant itself needs a provider. The most common one is **VirtualBox**:

```bash
sudo apt install virtualbox -y
```

---

### Step 7: Test Vagrant Setup
Create a test project:

```bash
mkdir vagrant_test && cd vagrant_test
vagrant init hashicorp/bionic64
vagrant up
```

This will download a Ubuntu 18.04 (bionic) Vagrant box and boot it. To log in:

```bash
vagrant ssh
```

To stop the VM:

```bash
vagrant halt
```

---

### 🎯 Conclusion
That’s it! You’ve successfully installed Vagrant on Ubuntu. You can now use it to create reproducible development environments, test configurations, or experiment with different OS setups easily.  

👉 In future blogs, we’ll cover **Vagrant with Docker provider**, **multi-machine Vagrantfiles**, and **provisioning with Ansible**.  

Post: [Vagrant Command-Line Interface](https://narendra-kaduru-portfolio.netlify.app/blog/vagrant-cli)