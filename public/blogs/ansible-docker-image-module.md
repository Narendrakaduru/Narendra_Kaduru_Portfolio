# Managing Docker Images with Ansible `docker_image` Module 🐳
---

Docker image management is a key part of DevOps workflows. With Ansible's **`docker_image`** module, you can automate building, pushing, pulling, archiving, and loading images across your environments.

Let's break it down into separate playbooks for clarity.

### Requirements

✅ Ansible installed (≥ 2.9) → [Install Ansible](https://narendrakaduru.online/blog/install-ansible-using-pip)\
✅ community.docker collection (`ansible-galaxy collection install community.docker`)\
✅ Docker installed on target hosts\
✅ Access to Docker Hub (for build & push)

### Directory Structure

```text
ansible/docker_image
├── ansible.cfg
├── inventory
├── archive_image.yml
├── build_image.yml
├── load_image.yml
├── pull_nginx.yml
├── hello_app
│   ├── app.js
│   ├── Dockerfile
│   └── package.json
└── hello-node-docker-v1.0.tar
```

### 1\. Build & Push → `build_image.yml`

This playbook builds a Node.js app Docker image and pushes it to Docker Hub.

```yaml
- name: Deploy Hello Node.js App
  hosts: all
  become: yes

  tasks:
    - name: Log in to Docker Hub
      community.docker.docker_login:
        username: "narendra8686"
        password: "{{ docker_hub_password }}"
      delegate_to: localhost

    - name: Build and Push Docker Image locally
      community.docker.docker_image:
        name: narendra8686/hello-node-docker
        tag: v1.0
        source: build
        build:
          path: ./hello_app
        push: true
        state: present
      delegate_to: localhost

    - name: Log out from Docker Hub
      community.docker.docker_login:
        state: absent
      delegate_to: localhost
```

##### Inventory File → `inventory`

```ini
[ubuntu]
192.168.1.100 ansible_user=nani ansible_ssh_private_key_file=~/.ssh/id_ed25519_vldocsrv0100

[all:vars]
docker_hub_password=YOUR_DOCKER_TOKEN
```

##### Ansible config File → `ansible.cfg`

```yaml
[defaults]
host_key_checking = False
interpreter_python = auto_silent
```

📌 **Tip:** This config disables host key checking (avoids SSH authenticity prompts when connecting to new hosts) and ensures Python is auto-detected on managed hosts, preventing version/path issues.

✅ **Outcome:** Builds the app image locally, pushes it to Docker Hub, and ensures credentials are managed securely.


### 2\. Pull (like Nginx) → `pull_nginx.yml`

This ensures the latest Nginx image is available on your host.

```yaml
- name: Pull Nginx Docker Image
  hosts: all
  become: yes

  tasks:
    - name: Ensure Nginx image is pulled
      community.docker.docker_image:
        name: nginx
        tag: latest
        source: pull
        state: present
```

✅ **Outcome:** Always pulls the latest Nginx image, keeping deployments consistent.


### 3\. Archive → `archive_image.yml`

Save your built image as a `.tar` archive for portability.

```yaml
- name: Archive Hello Node.js Docker Image
  hosts: all
  become: yes

  tasks:
    - name: Save local image as tarball
      community.docker.docker_image:
        name: narendra8686/hello-node-docker
        tag: v1.0
        source: local
        archive_path: /home/nani/ansible/docker_image/hello-node-docker-v1.0.tar
```

✅ **Outcome:** Creates a tarball (`hello-node-docker-v1.0.tar`) that can be shared or moved offline.


### 4\. Load → `load_image.yml`

Load the image back into Docker from the tarball.

```yaml
- name: Load Hello Node.js Docker Image from tarball
  hosts: all
  become: yes

  tasks:
    - name: Load Docker image from tarball
      community.docker.docker_image:
        name: narendra8686/hello-node-docker
        tag: v1.0
        source: load
        load_path: /home/nani/ansible/docker_image/hello-node-docker-v1.0.tar
```

✅ **Outcome:** Reloads the previously saved image and makes it available locally again.

### Final Thoughts ✨

With these playbooks, you can:

-   **Build & Push** custom images (`build_image.yml`)
-   **Pull** ready-made images like Nginx (`pull_nginx.yml`)
-   **Archive** images into tarballs for offline use (`archive_image.yml`)
-   **Load** them back later (`load_image.yml`)

👉 This setup gives you a **full lifecycle management** of Docker images---ideal for CI/CD pipelines, offline deployments, and consistent environments.