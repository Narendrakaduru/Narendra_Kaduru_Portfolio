# Copying Files Across Servers with Ansible Copy Module 📂
---

Managing files is one of the most common tasks in server administration. Whether you're deploying configuration files, distributing scripts, or updating application assets, you need a reliable and repeatable way to copy files across multiple servers.

Traditionally, you might use tools like **scp** or **rsync**, but these require manual execution and don't guarantee idempotency. That's where Ansible comes in.

The **`ansible.builtin.copy` module** provides a simple, automated, and idempotent way to manage files across servers, making your automation predictable and consistent.

### What is the Ansible Copy Module?

The **Ansible copy module** is used to transfer files from your **control node (local machine)** to **managed nodes (remote servers)**. It's simple yet powerful, and ensures automation stays reliable and repeatable.

Key features:

- ✅ **Idempotent** - files are copied only when they've changed.
- ✅ **Preserves attributes** - permissions, ownership, and SELinux labels can be enforced.
- ✅ **Flexible input** - supports copying files or inline text content.
- ✅ **Safe updates** - can create backups before overwriting existing files.

👉 In short, using the copy module is a **best-practice** alternative to `scp` or manual transfers, ensuring consistency and automation.

### Basic Syntax

```yaml
- name: Copy a file to remote server
  ansible.builtin.copy:
    src: /local/path/to/file.conf
    dest: /etc/myapp/file.conf
    owner: root
    group: root
    mode: '0644'
```

### Parameters explained:

| Parameter | Description |
| --- | --- |
| `src` | Path to the file on the control node |
| `dest` | Destination path on the remote server |
| `owner` | File owner on the remote server |
| `group` | File group on the remote server |
| `mode` | File permissions (e.g., `0644`, `0755`) |
| `content` | Inline text instead of a file |
| `backup` | Backup existing file before replacing |


### Real-Time Examples

##### 1️⃣ Copy a Configuration File

```yaml
- name: Deploy Nginx configuration
  hosts: webservers
  become: yes
  tasks:
    - name: Copy nginx.conf
      ansible.builtin.copy:
        src: files/nginx.conf
        dest: /etc/nginx/nginx.conf
        owner: root
        group: root
        mode: '0644'
```

✅ Ensures all web servers have the same config file with the right permissions.

##### 2️⃣ Copy Inline Content

Instead of a file, you can provide content directly:

```yaml
- name: Add a banner message
  hosts: all
  become: yes
  tasks:
    - name: Create /etc/motd file
      ansible.builtin.copy:
        dest: /etc/motd
        content: |
          Welcome to the server!
          Managed by Ansible 🚀
```

✅ Useful for quick configuration files or text banners.

##### 3️⃣ Backup Before Overwriting

```yaml
- name: Copy with backup enabled
  hosts: all
  tasks:
    - name: Replace config file with backup
      ansible.builtin.copy:
        src: files/app.conf
        dest: /etc/myapp/app.conf
        backup: yes
```

✅ Keeps a backup of the existing file before replacing it.

##### 4️⃣ Setting Permissions

```yaml
- name: Copy script with executable permission
  hosts: all
  tasks:
    - name: Deploy script
      ansible.builtin.copy:
        src: scripts/deploy.sh
        dest: /usr/local/bin/deploy.sh
        mode: '0755'
```

✅ Ensures the script is copied with execute permission.

##### 5️⃣ Copy Files to Multiple Hosts

Since Ansible is multi-host by design, you can copy files to many servers at once:

```yaml
- name: Distribute SSH authorized_keys
  hosts: all
  tasks:
    - name: Deploy authorized_keys
      ansible.builtin.copy:
        src: files/authorized_keys
        dest: /home/{{ ansible_user }}/.ssh/authorized_keys
        mode: '0600'
```

✅ Makes it easy to distribute SSH keys or common files across all nodes.

##### 6️⃣ Using `remote_src` for Remote-to-Remote Copies

By default, the `copy` module looks for files **on your local Ansible control node** and transfers them to the remote server. But sometimes, the file is **already present on the remote host** (e.g., downloaded or generated there). That's where `remote_src` comes in.

`remote_src: no` (default) → Copy from Local to Remote

```yaml
- name: Copy nginx.conf to remote server
  hosts: webservers
  become: yes
  tasks:
    - name: Copy nginx.conf from control node
      ansible.builtin.copy:
        src: ./nginx.conf       # Local file on control node
        dest: /etc/nginx/nginx.conf
        remote_src: no          # Default
```
✅ Copies the file **from your control node** → remote host.\
✅ Typical use case when config files live in your Ansible repo.

`remote_src: yes` → Copy Within the Remote Host

```yaml
- name: Move nginx.conf on remote server
  hosts: webservers
  become: yes
  tasks:
    - name: Copy nginx.conf that already exists remotely
      ansible.builtin.copy:
        src: /tmp/nginx.conf    # File already on remote host
        dest: /etc/nginx/nginx.conf
        remote_src: yes
```

✅ No transfer from control node.\
✅ File is copied **within the same remote server**.\
✅ Useful when files are downloaded, extracted, or generated remotely.

👉 In short:

-   Use **`remote_src: no` (default)** when the file lives on your local machine.
-   Use **`remote_src: yes`** when the file already exists on the target system.

##### 7️⃣ Handling Symlinks with `follow`

When working with configuration files, you may encounter **symbolic links (symlinks)** instead of actual files. The `follow` option in the **copy module** controls whether Ansible should copy the **real file** or the **symlink itself**.

`follow: yes` (default) → Copy the Target File

```yaml
- name: Copy the actual file instead of symlink
  hosts: webservers
  become: yes
  tasks:
    - name: Copy nginx.conf by following symlink
      ansible.builtin.copy:
        src: /tmp/nginx.conf.link   # symlink → /etc/nginx/nginx.conf
        dest: /etc/nginx/nginx.conf
        follow: yes                 # Default
```

✅ The actual file `/etc/nginx/nginx.conf` is copied.\
❌ The symlink itself is not recreated on the destination.

`follow: no` → Copy the Symlink Itself

```yaml
- name: Copy the symlink itself
  hosts: webservers
  become: yes
  tasks:
    - name: Preserve symlink during copy
      ansible.builtin.copy:
        src: /tmp/nginx.conf.link   # symlink → /etc/nginx/nginx.conf
        dest: /etc/nginx/nginx.conf.link
        follow: no
```

✅ The symlink itself gets copied.\
❌ The target file is **not** transferred.

👉 **In short:**

-   Use `follow: yes` (default) if you want the **actual file**.
-   Use `follow: no` if you want to **preserve the symlink** itself.

### Copy vs Template

-   Use **copy** → when you just need to copy static files.
-   Use **template** → when files need variables (`{{ }}`) or dynamic rendering with Jinja2.

### 📝 Key Notes

-   The `copy` module is **idempotent** -- files are updated only if changes occur.
-   Always define **permissions (mode)** for sensitive files (e.g., SSH keys).
-   Use `backup: yes` for critical files.
-   Use `template` instead of `copy` when variables or logic are needed.

### 🎯 Conclusion

The Ansible Copy Module is one of the simplest yet most powerful tools for automation engineers. By ensuring consistency, correct permissions, and idempotency, it removes the risks of manual file transfers and makes large-scale file management easy.

👉 Next time you think of running scp manually, let Ansible handle it for you!