# Automating User Management with Ansible User Module 👤🚀
---

Managing users efficiently is one of the most common yet critical tasks in any Linux environment. Whether you're onboarding new team members, setting password policies, or automating SSH key distribution, doing this manually across multiple servers is time-consuming and error-prone.

This is where **Ansible's `user` module** comes into play. It allows you to automate the creation, modification, and removal of user accounts across all your managed hosts in a consistent, secure, and scalable way.

In this blog, we'll cover:

-   The purpose of the Ansible `user` module.
-   Creating, modifying, and removing users.
-   Managing **groups**, **passwords**, and **SSH keys**.
-   Why **`python3-passlib`** is needed for password hashing.
-   Real-world playbook examples.
-   Best practices for security and scalability.


### Why Use the Ansible User Module?

The `user` module allows you to:

-   Create and remove users across multiple Linux systems.
-   Set or update user passwords securely.
-   Manage SSH keys for secure, passwordless logins.
-   Assign users to groups (primary and supplementary).
-   Control advanced attributes like shell, home directory, and account expiration.

This automation ensures that all your servers follow the same user management policy, reducing human error and improving security.

### Creating a User

The simplest example is creating a new user:

```bash
- name: Create a new user 'alice'
  hosts: all
  become: true
  tasks:
    - name: Add user 'alice'
      ansible.builtin.user:
        name: alice
        state: present
```

This ensures the user alice exists on all target systems.

### Managing Passwords Securely

When working with user accounts, setting a secure password is often required.

However, Linux stores passwords as **hashed values** (not plain text) in `/etc/shadow`. Ansible expects the password in **hashed form**.

This is where **`python3-passlib`** comes in. Passlib is a Python library that allows Ansible to hash passwords using algorithms like `sha512`.


#### Example: Creating a User with a Hashed Password

```bash
- name: Create user with password
  hosts: all
  become: true

  pre_tasks:
    - name: Ensure python3-passlib is installed (Debian)
      ansible.builtin.apt:
        name: python3-passlib
        state: present
      when: ansible_os_family == "Debian"

    - name: Ensure python3-passlib is installed (RedHat)
      ansible.builtin.yum:
        name: python3-passlib
        state: present
      when: ansible_os_family == "RedHat"

  tasks:
    - name: Add user 'bob' with password
      ansible.builtin.user:
        name: bob
        state: present
        password: "{{ 'MySecurePassword' | password_hash('sha512') }}"
```

#### 🔑 **Explanation:**

-   `password_hash('sha512')` converts the plain text password into a secure hash.
-   The `python3-passlib` package is required because Ansible uses it to generate the hash.
-   This ensures that only hashed values are stored on the target system.

#### 👉 **Best Practice**: 

Never hardcode plain text passwords in playbooks. Instead, store them in **Ansible Vault** for secure encryption.

### Managing Groups

Assigning users to groups is another critical part of system management. You can define a primary group and add users to supplementary groups.

```bash
- name: Create user 'devuser' with group membership
  hosts: all
  become: true
  tasks:
    - name: Add user 'devuser' to groups
      ansible.builtin.user:
        name: devuser
        state: present
        groups: developers,admins
        append: yes
```

Here:

-   `groups` specifies which groups the user belongs to.
-   `append: yes` ensures existing group memberships are preserved.


### Managing SSH Keys

For secure, passwordless login, you can use SSH keys instead of passwords.

```bash
- name: Add user 'deploy' with SSH key
  hosts: all
  become: true
  tasks:
    - name: Create deploy user
      ansible.builtin.user:
        name: deploy
        state: present
        shell: /bin/bash

    - name: Add SSH key for deploy user
      ansible.posix.authorized_key:
        user: deploy
        state: present
        key: "{{ lookup('file', '/home/ansible/.ssh/id_rsa.pub') }}"
```

This ensures that the `deploy` user can log in securely with the provided SSH key.

### Deleting Users

Removing old or unused accounts is just as important for security.

```bash
- name: Remove user 'olduser'
  hosts: all
  become: true
  tasks:
    - name: Delete olduser
      ansible.builtin.user:
        name: olduser
        state: absent
        remove: yes
```

The `remove: yes` option also deletes the user's home directory and mail spool.

### Best Practices for User Management

1.  **Use Ansible Vault** to store passwords and private SSH keys.
2.  **Enforce least privilege** - only give users access to necessary groups.
3.  **Rotate credentials regularly** by updating passwords and SSH keys.
4.  **Automate cleanup** of inactive accounts to maintain security.
5.  **Test playbooks in staging** before applying them to production.

### ✅ Conclusion

The Ansible **`user` module** is a powerful tool for automating user account management across your infrastructure. From creating users and setting secure passwords (with `python3-passlib`) to managing groups and SSH keys, it provides a centralized, repeatable, and secure way to enforce policies at scale.

By integrating this module into your automation workflows, you ensure your systems remain consistent, compliant, and secure - without manual intervention.
