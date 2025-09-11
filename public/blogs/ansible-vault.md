# Ansible Vault for Secure Infrastructure Automation Management
---

When writing Ansible playbooks, you'll often need to store **sensitive information** like passwords, API keys, or SSH credentials. Storing these in plain text is risky. That's where **Ansible Vault** comes in.

Ansible Vault lets you **encrypt secrets** directly within playbooks, variables, or separate files, so you can safely share code without exposing sensitive data.

### Why Use Ansible Vault? 🤔

Vault = **security + collaboration**.\
It allows you to:

✅ Keep passwords, tokens, and keys safe\
✅ Encrypt only what's sensitive (not your entire playbook)\
✅ Share playbooks securely across your team\
✅ Integrate seamlessly with all Ansible commands

### Project Structure 📂

Here’s a simple example project using Ansible Vault:

```text
ansible-vault-example
├── secrets.yml        # Encrypted file with secrets (e.g., passwords, tokens)
├── site.yml           # Playbook referencing secrets
└── vault_pass.txt     # Vault password file (optional, for automation)
```

This structure keeps **secrets separate** from playbooks while making them easy to reference.

### Encrypting a File 🔒

Let's say you have a file `secrets.yml` containing database credentials:

```yaml
db_user: admin
db_pass: MySecretPassword
```

Encrypt it with:

```bash
ansible-vault encrypt secrets.yml
```

You’ll be prompted to set a vault password. After encryption, the file will look like gibberish.

### Using Vault in Playbooks 📂

You can include the encrypted file in your playbook like this:

```yaml
---
- hosts: ubuntu
  become: true
  vars_files:
    - secrets.yml   # encrypted file
  tasks:
    - name: Print DB user
      debug:
        msg: "Database user is {{ db_user }}"
```

When you run the playbook, Ansible will ask for the vault password.

### Running with Vault 🔑

You can provide the password at runtime:

```bash
ansible-playbook site.yml --ask-vault-pass
```

Or store it in a file and pass it automatically:

```bash
ansible-playbook site.yml --vault-password-file vault_pass.txt
```

### Editing Vault Files ✍️

Instead of decrypting and re-encrypting manually, you can edit encrypted files directly:

```bash
ansible-vault edit secrets.yml
```

### Other Useful Vault Commands 🛠️

##### Rekey (change password):

```bash
ansible-vault rekey secrets.yml
```

##### Decrypt (make it plain again):

```bash
ansible-vault decrypt secrets.yml
```

##### Encrypt string (inline):

```bash
ansible-vault encrypt_string 'MySecretPassword' --name 'db_pass'
```

This will give you an encrypted block you can paste directly into playbooks.


### Best Practices ⭐

-   Keep your vault password file **out of version control**
-   Encrypt only what's sensitive (avoid full-file encryption unless required)
-   Maintain separate Vault files for **dev, staging, and production**
-   Use CI/CD secrets management (e.g., Jenkins, GitHub Actions) with Vault files
-   Rotate your vault passwords regularly

### Final Thoughts ✨

With **Ansible Vault**, you can automate without fear of leaking credentials.\
It's lightweight, flexible, and integrates perfectly with your playbooks.

👉 Use it whenever your automation touches sensitive data.\
👉 For larger teams, consider integrating Ansible Vault with external secrets managers like **HashiCorp Vault or AWS Secrets Manager** for enterprise-grade security.