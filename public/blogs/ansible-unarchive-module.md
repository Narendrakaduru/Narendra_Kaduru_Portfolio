# Ansible Archive vs Unarchive: Automating Compression & Extraction 📦📂
---

File compression and extraction are everyday tasks in system administration --- whether you're **backing up configs, packaging applications, or deploying releases**. Instead of manually running `tar`, `gzip`, or `unzip` commands, Ansible provides two purpose-built modules:

-   **`archive`** → for creating compressed files
-   **`unarchive`** → for extracting compressed files

Think of them as **pack vs unpack** in your automation toolkit.


### 🔑 Quick Difference

-   **Archive**: Create `.tar`, `.gz`, `.bz2`, `.xz`, or `.zip` files.
-   **Unarchive**: Extract contents from those files.

In short: **Archive = Backup/Package → Unarchive = Deploy/Restore**.

### 📊 Archive vs Unarchive Comparison

| Feature | `archive` | `unarchive` |
| --- | --- | --- |
| **Purpose** | Compress files or directories | Extract compressed files |
| **Direction** | Files → Archive file | Archive file → Extracted contents |
| **Compression formats** | tar, gz, bz2, xz, zip | tar, gz, bz2, xz, zip |
| **Idempotent** | ✅ Only creates if changed | ✅ Only extracts if needed |
| **Key Params** | `path`, `dest`, `format`, `remove` | `src`, `dest`, `remote_src`, `extra_opts` |
| **Remote handling** | Creates archives directly on remote hosts | Can extract from control node or from files already on remote |
| **Use cases** | Backups, packaging, log archives | Deployments, restores, config extraction |

### Archive Module 📦


#### 🔹 What is the Archive Module?

The **archive** module compresses files or directories on a remote host.\
It's the reverse of **unarchive**, designed for **backups, packaging, and transfers**.

👉 Use it to:

-   Create backups of config files or logs.
-   Package applications before deployment.
-   Compress large directories for efficient transfer.

##### Key Benefits

✅ Supports multiple formats (`tar`, `gz`, `bz2`, `xz`, `zip`).\
✅ Idempotent --- archives are only recreated if files change.\
✅ Can remove source files automatically (`remove: yes`).\
✅ Saves storage and bandwidth.\
✅ Works natively on remote servers (no manual `scp`).

##### Basic Example: Create a Tarball

```yaml
- name: Archive /etc configs into tar.gz
  ansible.builtin.archive:
    path: /etc
    dest: /tmp/etc-backup.tar.gz
    format: gz
```

👉 This creates `/tmp/etc-backup.tar.gz` containing all files under `/etc`.

##### Archive with Remove Option

```yaml
- name: Archive logs and clean up originals
  ansible.builtin.archive:
    path: /var/log/myapp/
    dest: /tmp/myapp-logs.tar.bz2
    format: bz2
    remove: yes
```

✅ Compresses the logs.\
✅ Deletes the original log files after archiving.

##### Create a Zip Archive

```yaml
- name: Package app into a zip file
  ansible.builtin.archive:
    path: /var/www/myapp
    dest: /tmp/myapp.zip
    format: zip
```

👉 Ideal for systems or environments where `.zip` is preferred.

##### Common Use Cases

1️⃣ Backing up `/etc`, `/home`, or `/var/log` directories.\
2️⃣ Packaging web apps before deployment.\
3️⃣ Archiving reports before sending to storage.\
4️⃣ Compressing data sets for migration.

##### Best Practices

✔ Always specify `format` (`gz`, `bz2`, `xz`, or `zip`) to match your needs.\
✔ Use `remove: yes` only if you're certain originals can be safely deleted.\
✔ Store archives in `/tmp` or `/var/backups/`.\
✔ Combine with **unarchive** for end-to-end workflows (backup → restore).


### Unarchive Module 📂

#### 🔹 What is the Unarchive Module?

The **unarchive** module extracts compressed files on remote servers.\
Think of it as the reverse of the **archive** module

👉 Use it to:

-   Deploy pre-packaged apps.
-   Extract configs and static assets.
-   Install software from vendor archives.

##### Key Benefits

✅ Supports multiple formats (`tar`, `zip`, `gz`, `bz2`).\
✅ Works with files from local control node **or** existing files on remote hosts.\
✅ Idempotent --- only extracts when needed.\
✅ Automatically creates target directories.\
✅ Supports checksum validation for file integrity.\
✅ Can apply ownership and permissions during extraction.

##### Basic Example: Extract a Tarball

```yaml
- name: Extract app archive to /opt directory
  ansible.builtin.unarchive:
    src: /tmp/app-release.tar.gz
    dest: /opt/
    remote_src: yes
```

Here, `remote_src: yes` means the archive already exists on the remote host (`/tmp/app-release.tar.gz`).

##### Copy and Extract in One Step

If the archive is on your **local control node**, Ansible can copy it and extract in a single task:

```yaml
- name: Copy and extract zip file from control node
  ansible.builtin.unarchive:
    src: ./files/app.zip
    dest: /var/www/html/
    remote_src: no   # default, copies from control node
```

👉 Perfect for deploying builds directly from your laptop or CI/CD pipeline.

##### Extract with Permissions

```yaml
- name: Extract configs with proper ownership
  ansible.builtin.unarchive:
    src: ./configs/configs.tar.gz
    dest: /etc/myapp/
    owner: root
    group: root
    mode: 0755
```

Ensures extracted files are owned and accessible as expected.

##### How `extra_opts` Works

-   If the archive is a **tarball** → options are passed to the `tar` command.
-   If the archive is a **zip** → options are passed to the `unzip` command.

So, basically, it's a way to "extend" what Ansible's `unarchive` can do.

Extract Only Specific Directory from Archive

```yaml
- name: Extract only 'static' folder from archive
  ansible.builtin.unarchive:
    src: /tmp/app-release.tar.gz
    dest: /var/www/html/
    remote_src: yes
    extra_opts: [app/static]
```

👉 This extracts **only the `app/static` folder** instead of everything.

Exclude Files or Folders While Archiving

```yaml
- name: Archive app but exclude cache and temp files
  ansible.builtin.archive:
    path: /var/www/myapp/
    dest: /tmp/myapp.tar.gz
    format: gz
    exclude_path:
      - "*.tmp"
      - "cache/"
```

✅ This will:

-   Archive everything in `/var/www/myapp/`.
-   Skip all files ending in `.tmp`.
-   Exclude the entire `cache/` directory.

👉 Perfect when you want a **clean backup or package** without clutter from temporary files, caches, or logs.

👉 In short:\
`extra_opts` = **pass extra arguments to tar/unzip** for advanced extraction control.

##### Common Use Cases

1️⃣ Deploying pre-packaged applications (WordPress, Tomcat, etc.).\
2️⃣ Extracting SSL certificates into `/etc/ssl/`.\
3️⃣ Distributing reports or logs packed as `.tar.gz` or `.zip`.\
4️⃣ Installing third-party software from vendor archives.

##### Best Practices

✔ Use `remote_src: yes` when the archive is already present on the remote host (saves bandwidth).\
✔ Always use `checksum` in production for integrity.\
✔ Combine with **get_url** or **copy** module for downloading/distributing archives.\
✔ Run with `become: yes` when writing to system directories.

### 🚀 Putting It All Together

- **Archive** = Backup, package, compress  
- **Unarchive** = Restore, deploy, extract  

A typical workflow looks like this:

1. **Archive** → Collect configs, logs, or app code into a compressed package.  
2. **Transfer** → Move the archive across environments or servers.  
3. **Unarchive** → Extract and deploy on the target server.  

👉 With both modules in your toolkit, you can automate the full lifecycle of files — from packaging to deployment — in a repeatable, idempotent, and reliable way.