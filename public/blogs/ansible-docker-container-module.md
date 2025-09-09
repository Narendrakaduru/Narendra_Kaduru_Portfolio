# Managing Docker Containers with Ansible `docker_container` Module 🐳
---

Managing Docker containers is at the heart of modern DevOps workflows. With Ansible's **`docker_container`** module, you can automate **creating, starting, stopping, removing, and restarting containers** - no manual `docker run` or `docker stop` needed.

Let's break it down into **real-world playbooks** for clarity.

### Directory Structure

```text
ansible/docker_container
├── ansible.cfg              # Ansible configuration (disables host key checking, sets Python interpreter)
├── inventory                # Inventory file for target hosts
│
├── run_hello_app.yml        # Playbook: Run Hello App container (image already built/available)
├── run_nginx.yml            # Playbook: Run an Nginx container
├── stop_container.yml       # Playbook: Stop running containers
├── restart_container.yml    # Playbook: Restart containers
└── remove_container.yml     # Playbook: Remove containers
```

### Requirements

✅ Ansible installed (≥ 2.9) → [Install Ansible](https://narendrakaduru.online/blog/install-ansible-using-pip)\
✅ community.docker collection (`ansible-galaxy collection install community.docker`)\
✅ Docker installed on target hosts\
✅ Access to Docker Hub (for build & push)

### 1\. Run an Nginx Container → `run_nginx.yml`

```yaml
- name: Run Nginx Container
  hosts: all
  become: yes

  tasks:
    - name: Start Nginx container
      community.docker.docker_container:
        name: nginx_server
        image: nginx:latest
        state: started
        ports:
          - "8080:80"
```

##### Inventory File → `inventory`

```ini
[ubuntu]
192.168.1.100 ansible_user=nani ansible_ssh_private_key_file=~/.ssh/id_ed25519_vldocsrv0100
```

##### Ansible Config File → `ansible.cfg`

```yaml
[defaults]
host_key_checking = False
interpreter_python = auto_silent
```

📌 This avoids SSH authenticity prompts and ensures Python is auto-detected on managed hosts.

✅ **Outcome:** Launches Nginx, accessible at `http://<host-ip>:8080`.

```bash
nani@vldocsrv0100:~/ansible/docker_container$ ansible-playbook -i inventory run_nginx.yml

PLAY [Run Nginx Container] ************************************************************************************************************************************

TASK [Gathering Facts] ****************************************************************************************************************************************
ok: [192.168.1.100]

TASK [Start Nginx container] **********************************************************************************************************************************
changed: [192.168.1.100]

PLAY RECAP ****************************************************************************************************************************************************
192.168.1.100              : ok=2    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0

nani@vldocsrv0100:~/ansible/docker_container$ docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS          PORTS                  NAMES
c2db544f643d   nginx:latest   "/docker-entrypoint.…"   13 seconds ago   Up 12 seconds   0.0.0.0:8080->80/tcp   nginx_server
nani@vldocsrv0100:~/ansible/docker_container$ curl http://localhost:8080 | grep "<h1>"
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   615  100   615    0     0   141k      0 --:--:-- --:--:-- --:--:--  200k
<h1>Welcome to nginx!</h1>
```

### 2\. Run Your Custom App (Hello Node.js) → `run_hello_app.yml`

```yaml
- name: Run Hello Node.js App Container
  hosts: all
  become: yes

  tasks:
    - name: Run hello-node-docker container
      community.docker.docker_container:
        name: hello_app
        image: narendra8686/hello-node-docker:v1.0
        state: started
        ports:
          - "3000:3000"
```

✅ **Outcome:** Runs your Node.js app (built earlier with `docker_image`) and exposes it at port `3000`.

```bash
nani@vldocsrv0100:~/ansible/docker_container$ ansible-playbook -i inventory run_hello_app.yml

PLAY [Run Hello Node.js App Container] ************************************************************************************************************************

TASK [Gathering Facts] ****************************************************************************************************************************************
ok: [192.168.1.100]

TASK [Run hello-node-docker container] ************************************************************************************************************************
changed: [192.168.1.100]

PLAY RECAP ****************************************************************************************************************************************************
192.168.1.100              : ok=2    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0

nani@vldocsrv0100:~/ansible/docker_container$ docker ps
CONTAINER ID   IMAGE                                 COMMAND                  CREATED          STATUS          PORTS                    NAMES
d9e27e740dea   narendra8686/hello-node-docker:v1.0   "docker-entrypoint.s…"   54 seconds ago   Up 53 seconds   0.0.0.0:3000->3000/tcp   hello_app
c2db544f643d   nginx:latest                          "/docker-entrypoint.…"   11 minutes ago   Up 11 minutes   0.0.0.0:8080->80/tcp     nginx_server

nani@vldocsrv0100:~/ansible/docker_container$ curl http://localhost:3000
Hello from Node.js inside Docker!
```

### 3\. Stop a Container → `stop_container.yml`

```yaml
- name: Stop a Running Container
  hosts: all
  become: yes

  tasks:
    - name: Stop nginx_server container
      community.docker.docker_container:
        name: nginx_server
        state: stopped
```

✅ **Outcome:** Gracefully stops the running container without removing it.

```bash
nani@vldocsrv0100:~/ansible/docker_container$ ansible-playbook -i inventory stop_container.yml

PLAY [Stop a Running Container] *******************************************************************************************************************************

TASK [Gathering Facts] ****************************************************************************************************************************************
ok: [192.168.1.100]

TASK [Stop nginx_server container] ****************************************************************************************************************************
changed: [192.168.1.100]

PLAY RECAP ****************************************************************************************************************************************************
192.168.1.100              : ok=2    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0

nani@vldocsrv0100:~/ansible/docker_container$ docker ps -a
CONTAINER ID   IMAGE                                 COMMAND                  CREATED          STATUS                     PORTS                    NAMES
d9e27e740dea   narendra8686/hello-node-docker:v1.0   "docker-entrypoint.s…"   4 minutes ago    Up 4 minutes               0.0.0.0:3000->3000/tcp   hello_app
c2db544f643d   nginx:latest                          "/docker-entrypoint.…"   14 minutes ago   Exited (0) 7 seconds ago                            nginx_server
```

### 4\. Remove a Container → `remove_container.yml`

```yaml
- name: Remove Docker Container
  hosts: all
  become: yes

  tasks:
    - name: Delete hello_app container
      community.docker.docker_container:
        name: hello_app
        state: absent
```

✅ **Outcome:** Deletes the container completely (like `docker rm`).

```bash
nani@vldocsrv0100:~/ansible/docker_container$ ansible-playbook -i inventory remove_container.yml

PLAY [Remove Docker Container] ********************************************************************************************************************************

TASK [Gathering Facts] ****************************************************************************************************************************************
ok: [192.168.1.100]

TASK [Delete hello_app container] *****************************************************************************************************************************
changed: [192.168.1.100]

PLAY RECAP ****************************************************************************************************************************************************
192.168.1.100              : ok=2    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0

nani@vldocsrv0100:~/ansible/docker_container$ docker ps -a
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS                     PORTS     NAMES
c2db544f643d   nginx:latest   "/docker-entrypoint.…"   16 minutes ago   Exited (0) 2 minutes ago             nginx_server
```

### 5\. Restart a Container → `restart_container.yml`

```yaml
- name: Restart Docker Container
  hosts: all
  become: yes

  tasks:
    - name: Restart nginx_server container
      community.docker.docker_container:
        name: nginx_server
        restart: yes
```

✅ **Outcome:** Restarts the container to apply config or image updates.

```bash
nani@vldocsrv0100:~/ansible/docker_container$ docker ps -a
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS                     PORTS     NAMES
c2db544f643d   nginx:latest   "/docker-entrypoint.…"   17 minutes ago   Exited (0) 3 minutes ago             nginx_server
nani@vldocsrv0100:~/ansible/docker_container$ ansible-playbook -i inventory restart_container.yml

PLAY [Restart Docker Container] *******************************************************************************************************************************

TASK [Gathering Facts] ****************************************************************************************************************************************
ok: [192.168.1.100]

TASK [Restart nginx_server container] *************************************************************************************************************************
changed: [192.168.1.100]

PLAY RECAP ****************************************************************************************************************************************************
192.168.1.100              : ok=2    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0

nani@vldocsrv0100:~/ansible/docker_container$ docker ps -a
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS         PORTS                  NAMES
c2db544f643d   nginx:latest   "/docker-entrypoint.…"   18 minutes ago   Up 3 seconds   0.0.0.0:8080->80/tcp   nginx_server
```

Final Thoughts ✨
----------------

With Ansible's `docker_container` module, you can:

-   🚀 **Run** apps like Nginx or your custom Node.js app
-   🛑 **Stop** containers gracefully
-   🗑 **Remove** unused containers
-   🔄 **Restart** containers for updates

👉 This provides **end-to-end container lifecycle management** --- perfect for CI/CD pipelines, microservices, and production deployments.