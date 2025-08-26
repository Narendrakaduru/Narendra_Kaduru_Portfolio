# Ansible APT Module: Automating Package Management on Ubuntu
---

### Introduction

The apt module is one of the most widely used Ansible modules. It allows you to **install, update, and remove packages** on Debian/Ubuntu systems in a fully automated and idempotent way.

Instead of logging into multiple servers and manually running apt install, you can write a simple playbook and let Ansible do the heavy lifting.

### Why Use the apt Module?

- Works with Ubuntu/Debian package manager.
- Automates package installation across multiple servers at once.
- Supports updates, removals, cache refresh, and specific versions.
- Idempotent: Runs multiple times without breaking things.

### Common Parameters for Ansible apt Module

| Parameter     | Description                                | Example               |
|---------------|--------------------------------------------|-----------------------|
| name          | Name of the package (or list of packages). | nginx, [git, curl]    |
| state         | Desired state of the package. Options: `present`, `absent`, `latest`. | state: present |
| update_cache  | Refresh apt cache before installation.     | yes                   |
| upgrade       | Upgrade all packages. Options: `yes`, `safe`, `dist`. | dist |

### Example 1: Install a Single Package

```bash
- name: Install Nginx
  hosts: web
  become: yes
  tasks:
    - name: Install nginx package
      ansible.builtin.apt:
        name: nginx
        state: present
        update_cache: yes
```

✅ This playbook installs Nginx only if it’s not already installed.

### Example 2: Install Multiple Packages

```bash
- name: Install Dev Tools
  hosts: all
  become: yes
  tasks:
    - name: Install git, curl, and unzip
      ansible.builtin.apt:
        name:
          - git
          - curl
          - unzip
        state: present
        update_cache: yes
```

### Example 3: Remove a Package

```bash
- name: Remove Apache2
  hosts: web
  become: yes
  tasks:
    - name: Ensure apache2 is absent
      ansible.builtin.apt:
        name: apache2
        state: absent
```

### Example 4: Upgrade Packages

```bash
- name: Upgrade all packages
  hosts: all
  become: yes
  tasks:
    - name: Run full upgrade
      ansible.builtin.apt:
        upgrade: dist
```

### Conclusion

The apt module is often the **first step into Ansible automation**. It helps you automate software installation, updates, and removals across all your Ubuntu/Debian servers with a single playbook.

If you’re new to Ansible, start experimenting with apt - it’s the easiest way to see the power of automation in action.
