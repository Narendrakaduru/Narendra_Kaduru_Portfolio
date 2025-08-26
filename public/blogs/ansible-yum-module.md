# Mastering Ansible YUM Module: Automating Package Management on CentOS

When working with **RHEL-based systems** like **CentOS, Rocky Linux, AlmaLinux**, and **Fedora**, package management is often handled using **yum** or **dnf**. Ansible provides the **yum** module to automate package installations, updates, and removals, making system administration effortless.

In this guide, we’ll cover the basics, parameters, and real-world usage examples of the **Ansible** `yum` **module**.

### Why Use the yum Module?

Instead of manually running commands like `yum install nginx -y`, you can use Ansible to ensure packages are always installed, updated, or removed consistently across multiple servers. This is **idempotent automation** - you declare the state you want, and Ansible makes it happen.

### Common Parameters of the yum Module  

| Parameter        | Description                               | Example          |
|------------------|-------------------------------------------|------------------|
| name             | Package name or list of packages          | nginx, [git, curl] |
| state            | Desired state: present, absent, latest    | state: present   |
| update_cache     | Refresh yum cache before installing       | yes              |
| enablerepo       | Enable specific repositories during task  | epel             |
| disablerepo      | Disable specific repositories during task | base             |
| disable_gpg_check| Ignore GPG signature check                | yes              |

### Examples
#### 1.  Install a Package

```bash
- name: Install nginx on CentOS
  ansible.builtin.yum:
    name: nginx
    state: present
```

#### 2. Install Multiple Packages

```bash
- name: Install multiple packages
  ansible.builtin.yum:
    name:
      - git
      - curl
      - wget
    state: present
```

#### 3. Remove a Package

```bash
- name: Remove nginx
  ansible.builtin.yum:
    name: nginx
    state: absent
```

#### 4. Update a Package to Latest Version

```bash
- name: Update git to the latest version
  ansible.builtin.yum:
    name: git
    state: latest
```

#### 5. Update All Packages

```bash
- name: Update all packages
  ansible.builtin.yum:
    name: '*'
    state: latest
```

#### 6. Install Package from a Specific Repo

```bash
- name: Enable EPEL repository
  ansible.builtin.yum:
    name: epel-release
    state: present
- name: Install htop from epel repo
  ansible.builtin.yum:
    name: htop
    enablerepo: epel
    state: present
```



### Best Practices

- Always use update_cache: yes before large deployments to avoid stale metadata.
- Use state: latest cautiously in production—it ensures packages are updated but might introduce unexpected changes.
- Prefer defining package versions explicitly if stability is required.

✅ With the yum module, managing packages on **RHEL-based distributions** becomes simple, repeatable, and error-free.