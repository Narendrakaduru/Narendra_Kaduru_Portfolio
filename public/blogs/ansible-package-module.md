# How to Manage Packages with Ansible: A Complete Guide
---

Managing software packages across multiple servers can be challenging, especially when you’re dealing with different Linux distributions like **Ubuntu, Debian, or CentOS**. Ansible makes this process simple with the **package module**, which provides a universal way to manage packages without worrying about the underlying package manager (apt, yum, dnf, zypper, etc.).

In this guide, we’ll explore how to:

- Install and remove packages using the **package module**
- Use **when conditions** to handle OS-specific package installations
- Write reusable playbooks for multi-distro environments

### Why Use the package Module?

Instead of writing tasks separately for `apt` (Debian/Ubuntu) or `yum/dnf` (CentOS/RHEL), the package module **automatically detects and uses the correct package manager** for the target host.

- 🛠 Simplifies playbooks — one module for all distros
- 🌍 Makes automation OS-agnostic
- ✂️ Reduces duplication in tasks

### Basic Usage of the package Module

Here’s how to install **Nginx** on any system using the `package` module with a single playbook:

```bash
- name: Install Nginx
  hosts: all
  become: yes
  tasks:
    - name: Ensure Nginx is installed
      ansible.builtin.package:
        name: nginx
        state: present
```

- 👉 On **Ubuntu/Debian**, this will use `apt`.
- 👉 On **CentOS/RHEL**, this will use `yum` or `dnf`.

### Handling OS-Specific Packages with when

Sometimes package names differ across distributions. 
For example:

- On **Debian/Ubuntu**: `apache2`
- On **CentOS/RHEL**: `httpd`

Another common case is htop. It’s not available in CentOS/RHEL’s default repos - you must first enable **EPEL (Extra Packages for Enterprise Linux)**.

Here’s how to handle it with when:

```bash
---
- name: Install htop on multiple distros
  hosts: all
  become: yes
  tasks:
    - name: Install htop on Debian/Ubuntu
      ansible.builtin.package:
        name: htop
        state: present
      when: ansible_facts['os_family'] == "Debian"

    - name: Enable EPEL repo on RHEL/CentOS
      ansible.builtin.package:
        name: epel-release
        state: present
      when: ansible_facts['os_family'] == "RedHat"

    - name: Install htop on RHEL/CentOS
      ansible.builtin.package:
        name: htop
        state: present
      when: ansible_facts['os_family'] == "RedHat"
```

💡 **Note:** If you skip enabling EPEL, you may see an error like:

```text
TASK [Install htop on RHEL/CentOS] ****************************************************************************************************************************
skipping: [192.168.1.100]
fatal: [192.168.1.101]: FAILED! => {"changed": false, "failures": ["No package htop available."], "msg": "Failed to install some of the specified packages", "rc": 1, "results": []}

PLAY RECAP ****************************************************************************************************************************************************
192.168.1.100              : ok=2    changed=1    unreachable=0    failed=0    skipped=1    rescued=0    ignored=0
192.168.1.101              : ok=1    changed=0    unreachable=0    failed=1    skipped=1    rescued=0    ignored=0
```

### nstalling Multiple Packages at Once

You don’t need separate tasks for each package. You can install multiple packages in one go:

```bash
- name: Install common tools
  hosts: all
  become: yes
  tasks:
    - name: Ensure tools are installed
      ansible.builtin.package:
        name:
          - curl
          - git
          - vim
        state: present
```

Or, using a loop:

```bash
- name: Install multiple tools with a loop
  hosts: all
  become: yes
  tasks:
    - name: Install tools
      ansible.builtin.package:
        name: "{{ item }}"
        state: present
      loop:
        - curl
        - git
        - vim
```
### Removing Packages

To remove a package, just set `state: absent`:

```bash
- name: Remove Apache if installed
  hosts: all
  become: yes
  tasks:
    - name: Ensure Apache is removed (Debian/Ubuntu)
      ansible.builtin.package:
        name: apache2
        state: absent
      when: ansible_facts['os_family'] == "Debian"

    - name: Ensure Apache is removed (RHEL/CentOS)
      ansible.builtin.package:
        name: httpd
        state: absent
      when: ansible_facts['os_family'] == "RedHat"
```

### Final Thoughts

The **package module** is a powerful tool for keeping your automation **simple and portable**. 
By combining it with **when condition**s, you can handle different Linux distributions gracefully - without writing separate playbooks for each OS.

🔑 Key Takeaways:

- Use `package` instead of `apt`, `yum`, or `dnf` for cross-platform automation.
- Add `when` conditions for OS-specific logic.
- Install or remove multiple packages in one go.
- Remember: Some packages (like htop) may require enabling extra repositories such as EPEL.