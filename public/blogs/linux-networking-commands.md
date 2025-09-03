# 20 Linux Networking Commands Every Sysadmin Should Know
---

Master the Tools to Monitor, Troubleshoot, and Optimize Your Network

### Introduction

If you are a system administrator, knowing a few networking commands in Linux is necessary. Whether you are trying to troubleshoot a connectivity issue, manage services, or configure firewall rules, the terminal is your place of work, and the command line is your tool. In this article, we will go through 20 critical commands for system administrators, with examples, notes, and best practices.

#### 1\. `ifconfig` (or `ip a`)

**Purpose:** Display network interfaces and IP addresses.

**Modern Alternative:** `ip address show`

```bash
ip a
```

#### 2\. `ping`

**Purpose:** Test the reachability of a host.

```bash
ping google.com
```

**Pro tip:** Use `-c 5` to limit ping count.

#### 3\. `traceroute` (or `tracepath`)

**Purpose:** Show the path packets take to a destination.

```bash
traceroute google.com
```

#### 4\. `netstat` (or `ss`)

**Purpose:** View network connections, listening ports, and routing tables.

**Modern Alternative:** `ss -tuln`

```bash
ss -tuln
```

#### 5\. `nslookup` / `dig`

**Purpose:** Perform DNS lookups.

```bash
dig openai.com
```

**Tip:** `dig +short` gives concise output.

#### 6\. `hostname` / `hostname -I`

**Purpose:** Display the system's hostname and IP address.

```bash
hostname -I
```

#### 7\. `ip route`

**Purpose:** View or configure routing tables.

```bash
ip route show
```

#### 8\. `nmap`

**Purpose:** Network scanner to discover hosts and services.

```bash
nmap -sP 192.168.1.0/24
```

**Warning:** Requires root; use responsibly.

#### 9\. `curl` / `wget`

**Purpose:** Retrieve content from URLs.

```bash
curl -I https://example.com
```

#### 10\. `tcpdump`

**Purpose:** Capture and analyze network packets.

```bash
tcpdump -i eth0
```

**Tip:** Use filters to narrow output.

#### 11\. `ethtool`

**Purpose:** Display Ethernet device settings.

```bash
ethtool eth0
```

#### 12\. `nmcli`

**Purpose:** Command-line interface for NetworkManager.

```bash
nmcli device status
```

#### 13\. `sshd` / `systemctl status ssh`

**Purpose:** Manage and verify SSH services.

```bash
systemctl status ssh
```

#### 14\. `iptables` / `ufw`

**Purpose:** Manage firewall rules.

```bash
iptables -L
```

**Alternative:**

```bash
ufw status verbose
```

#### 15\. `ip link`

**Purpose:** Show or modify network interfaces.

```bash
ip link show
```

#### 16\. `netplan` / `networkctl`

**Purpose:** Manage network configuration (for Ubuntu 18+).

```bash
netplan apply
```

#### 17\. `whois`

**Purpose:** Get ownership info for domain names.

```bash
whois openai.com
```

#### 18\. `scp` / `rsync`

**Purpose:** Transfer files over SSH.

```bash
scp file.txt user@server:/path
```

#### 19\. `arp` / `ip neigh`

**Purpose:** View or manipulate the ARP table.

```bash
ip neigh
```

#### 20\. `netcat` (`nc`)

**Purpose:** TCP/IP debugging and port scanning.

```bash
nc -zv example.com 80
```

**Bonus:** Use as a basic TCP server or client.

### 🎯 Conclusion

Learning these commands will not only assist you with day-to-day management, but they will also help you to feel more confident in diagnosing and remediating complex problems on the network as well. So make sure to practice these commands in a controlled environment, and always double-check syntax before updating in a production environment!