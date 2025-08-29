# Managing Systemd Services with Ansible: The Modern Approach
---

In modern Linux distributions, **systemd** has become the default init system, replacing older ones like SysVinit and Upstart. Whether you're running **RHEL 7+, CentOS 7+, Ubuntu 16.04+, Debian 8+, or Fedora**, you're almost certainly managing services via **systemd**.

As a DevOps engineer or sysadmin, automating service management with **Ansible** makes life easier, especially in large-scale environments. In this blog, we'll explore how to manage systemd services with Ansible using the **`ansible.builtin.systemd` module** - the modern approach to service management.



### Why Systemd Over Service?

Ansible provides both the **`service`** module and the **`systemd`** module.

-   The `service` module is **generic** - it works across SysV, Upstart, and Systemd.
-   The `systemd` module is **specific** to systemd and unlocks advanced features like:
    -   Reloading unit files (`daemon_reload`)
    -   Masking/unmasking services
    -   Managing service scopes and user sessions
    -   Handling transient services

Since most modern Linux distros use **systemd**, the `systemd` module is now the **preferred and more powerful choice**.


### Basic Example: Starting and Enabling a Service

Let's start with a simple playbook that ensures **nginx** is running and enabled on boot:

```bash
- name: Manage nginx with systemd
  hosts: webservers
  become: yes
  tasks:
    - name: Ensure nginx is started and enabled
      ansible.builtin.systemd:
        name: nginx
        state: started
        enabled: yes
```

👉 Here we are telling Ansible to:

-   Start the nginx service (`state: started`)
-   Enable nginx to start at boot (`enabled: yes`)

### Restarting Services with Daemon Reload

When you update service unit files (for example, `/etc/systemd/system/myapp.service`), systemd needs a **daemon reload**. The `systemd` module makes this easy:

```bash
- name: Reload systemd and restart my custom app
  hosts: appservers
  become: yes
  tasks:
    - name: Reload systemd to read new unit files
      ansible.builtin.systemd:
        daemon_reload: yes

    - name: Restart my custom app
      ansible.builtin.systemd:
        name: myapp
        state: restarted
```

### Masking and Unmasking Services

Sometimes you want to prevent a service from being started manually or automatically - this is where **masking** comes in.

```bash
- name: Mask a service to prevent accidental start
  hosts: all
  become: yes
  tasks:
    - name: Mask telnet service
      ansible.builtin.systemd:
        name: telnet
        masked: yes
```

To re-enable it later:

```bash
- name: Unmask telnet service
  ansible.builtin.systemd:
    name: telnet
    masked: no
```

### Managing User Services

Systemd isn't just for system services - it can manage **user services** too. For example:

```bash
- name: Start a user-level service
  hosts: devservers
  become: yes
  tasks:
    - name: Start VSCode server as user
      ansible.builtin.systemd:
        name: code-server
        scope: user
        state: started
```

### Real-World Use Case: Rolling Updates with Systemd

Imagine you're deploying a new version of your web application. You need to:

1.  Reload unit files (in case configs changed).
2.  Restart the service.
3.  Ensure it's enabled for persistence.

Here's how you'd do it with Ansible:

```bash
- name: Deploy new app version
  hosts: appservers
  become: yes
  tasks:
    - name: Reload systemd for updated unit files
      ansible.builtin.systemd:
        daemon_reload: yes

    - name: Restart app service
      ansible.builtin.systemd:
        name: myapp
        state: restarted
        enabled: yes
```

### Best Practices

✅ Use `systemd` instead of `service` when you know the target OS uses systemd.\
✅ Always include `daemon_reload: yes` if you deploy or modify unit files.\
✅ Use masking for **deprecated** or **insecure services** to avoid accidental usage.\
✅ Combine with Ansible **handlers** for efficient service restarts only when needed.


### Conclusion

The **systemd module in Ansible** gives you fine-grained control over service management in modern Linux environments. From basic start/stop operations to advanced features like daemon reload and masking, it's the go-to solution for managing services in production.

If your infrastructure runs on systemd-based distributions (which most do today), managing services with Ansible's `systemd` module is the **modern and reliable approach**.