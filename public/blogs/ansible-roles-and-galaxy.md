# Ansible Roles & Galaxy: Structuring and Reusing Automation 🔄⭐
---

As your playbooks grow, managing them in one file becomes messy. That's where **Roles** step in. Roles help you break automation into reusable, well-structured components. And with **Ansible Galaxy**, you can share or download pre-built roles, saving hours of effort.

### Why Roles? 🤔

Roles are like **modules for playbooks**. Instead of repeating tasks across multiple projects, you can package tasks, handlers, templates, and variables neatly in a role.

✅ **Benefits of using roles:**

-   Organizes your playbooks into clean, reusable components
-   Keeps handlers & notifications consistent
-   Makes automation portable across teams and projects
-   Works seamlessly with Ansible Galaxy

### Role Directory Structure 📂

When you create a role with `ansible-galaxy init`, you get a **standardized structure**. Here's what your project looks like:

```text
ansible-galaxy-roles
├── ansible.cfg
├── inventory
├── roles
│   └── nginx_role
│       ├── defaults
│       │   └── main.yml         # Default variables
│       ├── files                # Static files to copy
│       ├── handlers
│       │   └── main.yml         # Handlers (restart services, etc.)
│       ├── meta
│       │   └── main.yml         # Role metadata
│       ├── README.md            # Documentation for the role
│       ├── tasks
│       │   └── main.yml         # Core tasks
│       ├── templates
│       │   └── index.html.j2    # Jinja2 template for Nginx index page
│       ├── tests
│       │   ├── inventory        # Test inventory
│       │   └── test.yml         # Test playbook
│       └── vars
│           └── main.yml         # Custom variables
└── site.yml                     # Main playbook calling the role
```

This structure ensures your automation is modular and reusable.

### Creating a Role 🛠️

To generate the skeleton:

```bash
ansible-galaxy init nginx_role
```

### Example: Nginx Role 🚀

##### `tasks/main.yml`

```yaml
---
- name: Install Nginx
  apt:
    name: nginx
    state: present
    update_cache: yes
  notify: restart nginx

- name: Ensure Nginx is running
  service:
    name: nginx
    state: started
    enabled: true
```

##### `handlers/main.yml`

```yaml
---
- name: restart nginx
  service:
    name: nginx
    state: restarted
```

##### `templates/index.html.j2`

```yaml
<html>
  <head><title>{{ ansible_hostname }}</title></head>
  <body>
    <h1>Hello from {{ ansible_hostname }}</h1>
  </body>
</html>
```

##### `site.yml`

```yaml
---
- hosts: ubuntu
  become: true
  roles:
    - nginx_role
```

### ✅ **Outcome**:

-   Installs Nginx
-   Ensures it runs as a service
-   Deploys a custom homepage from the template
-   Restarts Nginx when config or template changes

### Using Ansible Galaxy ⭐

**Ansible Galaxy** is a public repository of roles. Instead of writing everything yourself, you can reuse battle-tested roles from the community.

##### 1️⃣ Search for roles

```bash
ansible-galaxy search nginx
```

##### 2️⃣ Install a role

```bash
ansible-galaxy install geerlingguy.nginx
```
##### 3️⃣ Use installed role

```yaml
- hosts: ubuntu
  roles:
    - geerlingguy.nginx
```

### Final Thoughts ✨

With **Roles**, your automation becomes modular, reusable, and easy to manage. Combine this with **Ansible Galaxy**, and you get access to thousands of pre-built roles, accelerating your automation journey.

👉 Use roles for **structure**, Galaxy for **speed**, and you'll be managing infrastructure like a pro.