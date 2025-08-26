# Installing Ansible with Pip and Running Your First Commands
---

Ansible is one of the most popular automation tools in DevOps. It helps you manage servers, deploy applications, and configure systems - all without logging in manually. In this guide, we’ll install **Ansible using pip**, configure it, and run our very first test command.

### Step 1: Update System Packages

Before installing Ansible, make sure your system is up to date:

```bash
sudo apt update && sudo apt upgrade -y
```

### Step 2: Install Pip

Note: Python will be pre installed on ubuntu you can check with:

```bash
python3 --version
```

Since Ansible is a Python-based tool, we’ll install it using pip:

```bash
sudo apt install python3-pip -y
```

### Step 3: Install Ansible with Pip

Now install Ansible globally using pip:

```bash
pip3 install ansible
```

### Step 4: Update PATH

When installed with pip, Ansible binaries are stored inside `~/.local/bin`. To ensure the system finds them, add this path to your environment:

```bash
vi ~/.bashrc
```

Add the following line at the bottom:

```bash
export PATH="$HOME/.local/bin:$PATH"
```

Reload the file:

```bash
source ~/.bashrc
```

Check the installation:

```bash
ansible --version
```

### Step 5: Set Up Ansible Project Directory

Create a working directory for Ansible:

```bash
mkdir -p ~/ansible
cd ~/ansible
```

### Step 6: Configure Inventory

An inventory file tells Ansible which servers to manage. Let’s create one:

```bash
vi inventory
```

Add the following content:

```bash
[local]
localhost ansible_connection=local

[web]
192.168.1.100 ansible_user=nani ansible_ssh_private_key_file=~/.ssh/id_ed25519_vldocsrv0100
192.168.1.93 ansible_user=nani ansible_ssh_private_key_file=~/.ssh/id_ed25519_vldocsrv0100
```

Here:

- **localhost** is your control machine
- **web group** contains two servers (192.168.1.100 and 192.168.1.93)

### Step 7: Configure SSH Keys

To allow Ansible to connect without entering passwords every time, we use **SSH key authentication**.

On your Ansible control node (192.168.1.100), copy its **public key** to the target server (192.168.1.93):

```bash
ssh-copy-id -i ~/.ssh/id_ed25519_vldocsrv0100.pub nani@192.168.1.93
```

This ensures server `192.168.1.100`(Ansible control node) can communicate securely with `192.168.1.93`(managed node) without requiring a password.

👉 You can also automate this process using a custom script like [create_user.sh](https://github.com/Narendrakaduru/vagrant-vb-infra/blob/main/scripts/create_user.sh)

That script creates a new user, sets up SSH keys, and configures sudo access automatically. With it, your servers will be ready for Ansible right after provisioning - no manual key copying required.

🔑 Note: Replace `nani` with the username you want to create on your managed server.

### Step 8: Configure Ansible Defaults

Create an `ansible.cfg` file to simplify configuration:

```bash
vi ansible.cfg
```

```bash
[defaults]
host_key_checking = False
interpreter_python = auto_silent
```

This disables host key prompts and lets Ansible detect Python automatically.

### Step 9: Test the Setup

Now let’s test connectivity to all hosts:

```bash
ansible -i inventory all -m ping
```

```bash
192.168.1.100 | SUCCESS => { "changed": false, "ping": "pong" }
192.168.1.93  | SUCCESS => { "changed": false, "ping": "pong" }
localhost     | SUCCESS => { "changed": false, "ping": "pong" }
```

Congratulations 🎉 — you just installed Ansible, set up your first inventory, and verified connectivity with a ping test!

✅ Next Steps

Now that you can reach your servers, the real power of Ansible begins. In upcoming blogs, we’ll explore:

- Writing Playbooks to automate tasks
- Creating reusable Roles
- Testing infrastructure with Molecule