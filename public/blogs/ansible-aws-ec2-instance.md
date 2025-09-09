# Provisioning AWS EC2 Instances with Ansible `ec2_instance` Module ☁️⚡
---

Automating cloud resources is a core DevOps skill, and Ansible makes it simple with its **`ec2_instance`** module. Instead of manually creating EC2 instances via the AWS Console, you can write playbooks to **launch, tag, and terminate instances** on demand.

### Requirements

-   Ansible (≥ 2.9) → [Install Ansible](https://narendrakaduru.online/blog/install-ansible-using-pip)
-   `amazon.aws` collection → `ansible-galaxy collection install amazon.aws`
-   AWS CLI configured (`aws configure`) with access + secret key
-   IAM user with EC2 permissions
-   SSH key pair created in AWS

### AWS CLI configuration

```bash
sudo apt update
sudo apt install -y unzip curl
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
rm -rf awscliv2.zip aws  #CleanUp
aws --version
aws configure
```

✅ **Outcome:**

```text
nani@vldocsrv0100:~$ aws --version
aws-cli/2.28.26 Python/3.13.7 Linux/5.15.0-153-generic exe/x86_64.ubuntu.22
nani@vldocsrv0100:~$ aws configure
AWS Access Key ID [None]: YOUR_ACCESS_KEY
AWS Secret Access Key [None]: YOUR_SECRET_KEY
Default region name [None]: ap-south-1
Default output format [None]:
```

### Install Python AWS SDK (Boto3 + Botocore)

Before running the playbook, make sure the AWS Python SDK libraries are available on your Ansible control node. These libraries (`boto3` and `botocore`) allow Ansible to communicate with AWS services.

```bash
pip3 install boto3 botocore
```
This step is mandatory — without these, Ansible cannot talk to AWS.

### Directory Structure 📂

```text
ansible/aws_ec2
├── ansible.cfg
├── inventory
├── launch_ec2.yml
├── stop_ec2.yml
├── start_ec2.yml
├── terminate_ec2.yml
└── variables.yml
```


### 1\. Launch EC2 Instance → `launch_ec2.yml`

This playbook provisions a new EC2 instance.

```yaml
- name: Launch AWS EC2 Instance
  hosts: localhost
  connection: local
  gather_facts: no

  vars_files:
    - variables.yml

  tasks:
    - name: Launch EC2 instance
      amazon.aws.ec2_instance:
        key_name: "{{ key_name }}"
        instance_type: "{{ instance_type }}"
        image_id: "{{ ami_id }}"
        region: "{{ region }}"
        security_group: "{{ security_group }}"
        count: 1
        network:
          assign_public_ip: true
        tags:
          Name: "ansible-ec2-demo"
          Project: "Ansible-AWS"
      register: ec2

    - name: Show instance info
      debug:
        var: ec2.instances
```

✅ **Outcome:** Creates a new EC2 instance with the specified configuration and tags.


##### Variables File → `variables.yml`

```yaml
region: ap-south-1
ami_id: ami-07f07a6e1060cd2a8    # Ubuntu 22.04 LTS (Mumbai region)
instance_type: t2.micro
key_name: ap-south-key-pair
security_group: Ansible-Ec2-SG
```


##### Inventory File → `inventory`

```ini
[ubuntu]
192.168.1.100 ansible_user=nani ansible_ssh_private_key_file=~/.ssh/id_ed25519_vldocsrv0100
```

### 2\. Stop EC2 Instance → stop_ec2.yml

Once your EC2 instance is launched, you may want to stop it to save costs when it's not in use. Ansible makes this easy with the same `ec2_instance` module.

```yaml
---
- name: Stop AWS EC2 Instance
  hosts: localhost
  connection: local
  gather_facts: no

  vars:
    instance_id: "i-05e4ce87723248f0b"   # Replace with your EC2 instance ID
    region: "ap-south-1"                 # Your AWS region

  tasks:
    - name: Stop the EC2 instance
      amazon.aws.ec2_instance:
        instance_ids:
          - "{{ instance_id }}"
        region: "{{ region }}"
        state: stopped
```

✅ **Outcome:** This playbook powers off your EC2 instance without terminating it.

- You won’t be billed for compute while stopped.
- EBS (storage) charges still apply.
- You can start it again later with a similar playbook.

### 3\. Start EC2 Instance → start_ec2.yml

If you’ve previously stopped an instance, you can bring it back online with this playbook:

```yaml
---
- name: Start AWS EC2 Instance
  hosts: localhost
  connection: local
  gather_facts: no

  vars:
    instance_id: "i-05e4ce87723248f0b"   # Replace with your EC2 instance ID
    region: "ap-south-1"                 # Your AWS region

  tasks:
    - name: Start the EC2 instance
      amazon.aws.ec2_instance:
        instance_ids:
          - "{{ instance_id }}"
        region: "{{ region }}"
        state: running
```
✅ Outcome: Your EC2 instance boots back into a running state, ready to accept SSH and application traffic.

### 4\. Terminate EC2 Instance → `terminate_ec2.yml`

When you no longer need an EC2 instance, you can terminate it permanently. This will delete the instance and stop all billing for compute and storage (except snapshots if you’ve created any).

```yaml
---
- name: Terminate AWS EC2 Instance
  hosts: localhost
  connection: local
  gather_facts: no

  vars:
    instance_id: "i-05e4ce87723248f0b"   # Replace with your EC2 instance ID
    region: "ap-south-1"                 # Your AWS region

  tasks:
    - name: Terminate the EC2 instance
      amazon.aws.ec2_instance:
        instance_ids:
          - "{{ instance_id }}"
        region: "{{ region }}"
        state: terminated
```

✅ Outcome: The EC2 instance is permanently deleted.

- All attached volumes (except explicitly kept ones) will be removed.
- You’ll stop incurring costs for the instance.
- This action cannot be undone.


### Final Thoughts ✨

The **Ansible `ec2_instance` module** makes working with AWS much easier. Instead of clicking around in the AWS Console, you can write simple playbooks that take care of your EC2 instances automatically.

Here's what you can do with it:

-   🚀 **Create new servers quickly** --- launch EC2 instances in just a few minutes.
-   📌 **Add useful tags** --- so you know what each server is used for and track costs better.
-   🛑 **Stop, start, or remove servers** whenever you want, helping you save money.

Using these playbooks in your **projects or pipelines** means:

-   Less manual work
-   Fewer mistakes
-   Faster and more reliable setups

👉 Whether you're just practicing, testing apps, or running real workloads, Ansible helps you manage AWS in a way that's **simple, cost-friendly, and fully automated**.