# 20 Essential Linux Networking Commands for Beginners
---

Learn the Basics to Check, Fix, and Understand Your Network

### 🌟 Introduction

If you are new to Linux system administration or just getting started with networking, learning some basic commands will make your life much easier. These commands help you check network settings, test connections, transfer files, and even troubleshoot issues.

In this guide, we'll go through **20 must-know networking commands** with simple explanations and examples so you can practice them right away.

#### 1\. `ip a` (or `ifconfig`)

**What it does:** Shows your computer's network interfaces and IP addresses.

**Modern Alternative:** `ip address show`

```bash
ip a
```

👉 Use this when you want to know **your system's IP address**.

#### 2\. `ping`

**What it does:** Tests if another computer/website is reachable.

```bash
ping google.com
```

**Pro tip:** Use `-c 5` to limit ping count.

```bash
ping -c 5 google.com
```

#### 3\. `traceroute` (or `tracepath`)

**What it does:** Shows the path your data takes to reach a server.

```bash
traceroute google.com
```

#### `ss` (modern replacement for `netstat`)

**What it does:** Lists active network connections and open ports.

**Modern Alternative:** `ss -tuln`

```bash
ss -tuln
```

👉 Great for checking which ports your system is listening on.

#### 5\. `dig` (or `nslookup`)

**What it does:** Checks DNS records of a website.

```bash
dig openai.com
```

**Tip:** 👉 Use dig +short for a simple output.

#### 6\. `hostname -I`

**What it does:** Shows your system's IP address.

```bash
hostname -I
```

#### 7. ip route

What it does: Displays the routing table (how your system sends traffic).

```bash
ip route show
```

#### 8\. `nmap`

**What it does:** Scans networks to find live hosts and open ports.

```bash
nmap -sP 192.168.1.0/24
```

⚠️ Needs root access. Use responsibly!

**Warning:** Requires root; use responsibly.

#### 9\. `curl` / `wget`

**What it does:** Downloads data from a URL.

```bash
curl -I https://example.com
```

#### 10\. `tcpdump`

**Purpose:** Capture and analyze network packets.

```bash
tcpdump -i eth0
```

**Tip:** 👉 Use filters (like `port 80`) to avoid too much output.

#### 11\. `ethtool`

**What it does:** Shows details of a network card.

```bash
ethtool eth0
```

#### 12\. `nmcli`

**What it does:** Manages connections using NetworkManager.

```bash
nmcli device status
```

#### 13\. `systemctl status ssh`

**What it does:** Checks if SSH service is running.

```bash
systemctl status ssh
```

#### 14\. `ufw` (or `iptables`)

**What it does:** Manages firewall rules.

```bash
iptables -L
```

**Alternative:**

```bash
ufw status verbose
```

#### 15\. `ip link`

**What it does:** Shows details of all network interfaces.

```bash
ip link show
```

#### 16\. `netplan` (Ubuntu 18+)

**What it does:** Applies network configuration changes.

```bash
netplan apply
```

#### 17\. `whois`

**What it does:** Shows info about domain ownership.

```bash
whois openai.com
```

#### 18\. `scp` / `rsync`

**What it does:** Copies files securely between computers.

```bash
scp file.txt user@server:/path
```

#### 19\. `ip neigh` (or `arp`)

**What it does:** Displays the ARP table (nearby devices).

```bash
ip neigh
```

#### 20\. `nc` (netcat)

**What it does:** Checks open ports or creates quick TCP connections.

```bash
nc -zv example.com 80
```

**Tip:** 👉 Can also be used as a simple server or client.

### 🎯 Conclusion

These 20 commands are the **building blocks of Linux networking**. As a beginner, don't worry about memorizing everything at once---just start practicing one by one. Over time, you'll naturally remember the most useful ones and feel more confident troubleshooting or managing networks.