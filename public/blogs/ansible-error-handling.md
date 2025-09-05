# Mastering Error Handling in Ansible: Register, Failed_when, and Block/Rescue/Always ⚡
---

Automation saves time, but what happens when things don't go as planned? In Ansible, error handling ensures your playbooks stay **robust, predictable, and smart**. Instead of breaking midway, you can control how failures are treated and what happens next.

Let's break it down step by step 👇



### 1\. Smarter Decisions with `register`

The `register` keyword captures the output of a task so you can decide what to do next.

#### Example: Conditional Apache Installation

```yaml
- name: Check if Apache is installed
  command: which apache2
  register: apache_check
  ignore_errors: true   # don't fail if apache2 not found

- name: Install Apache if not found
  apt:
    name: apache2
    state: present
  when: apache_check.rc != 0   # run only if Apache isn't installed

```

🔎 **What's happening?**

-   Task 1: Runs `which apache2` and stores the result in `apache_check`.
-   If Apache exists → `rc = 0`
-   If not → `rc != 0`
-   Task 2: Installs Apache only when it's missing.

✅ Benefit: No blind installations --- your playbook makes decisions based on system state.


### 2\. Fine-Grained Control with `failed_when`

Normally:

-   Exit code `0` → Success
-   Non-zero → Failure

But reality isn't always that simple.

#### Example: Custom Failure Rule

```yaml
- name: Run diagnostic script
  command: ./check.sh
  register: script_output
  failed_when: "'CRITICAL' in script_output.stdout"

```

🔎 **What's happening?**

-   Even if the script exits with `0`, Ansible marks it as **failed** if the word `CRITICAL` appears in the logs.

✅ Benefit: You define failure, not just exit codes.


### 3\. Structured Error Recovery with `block`, `rescue`, `always`

Think of these like **try / catch / finally** in programming languages.

#### Example: Safe Package Installation

```
- block:
    - name: Install custom package
      apt:
        name: myapp
        state: present

  rescue:
    - name: Log failure
      debug:
        msg: "Installation failed, falling back to default package."

    - name: Install default package
      apt:
        name: apache2
        state: present

  always:
    - name: Notify completion
      debug:
        msg: "Package installation attempt completed."

```

🔎 **What's happening?**

-   `block`: Tries to install `myapp`.
-   `rescue`: If it fails, logs the issue and installs Apache instead.
-   `always`: Runs no matter what, e.g., notifications or cleanup.

✅ Benefit: Your automation becomes fault-tolerant and self-healing.


### Final Thoughts ✨

Error handling in Ansible makes automation **resilient**. With these tools:

-   `register` → Capture results and make smart decisions
-   `failed_when` → Define your own failure conditions
-   `block/rescue/always` → Handle errors gracefully, recover, and clean up

👉 Instead of crashing, your playbooks adapt and continue --- just like a well-written program.


Would you like me to also create a **real-world troubleshooting playbook** that combines all three (`register`, `failed_when`, and `block/rescue/always`) into one example?