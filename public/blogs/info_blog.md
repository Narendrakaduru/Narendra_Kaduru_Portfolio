# Getting Started with DevOps

*Published on August 18, 2025*

DevOps is a set of practices that combines **software development (Dev)** and **IT operations (Ops)** to shorten the development lifecycle, improve quality, and automate workflows.  

This guide will take you through the **first steps in DevOps**, focusing on **Linux, Vagrant, Docker**, and essential tools for modern automation.

---

## 1. Why DevOps?

DevOps brings together **development, operations, and quality assurance** teams to work collaboratively. Its benefits include:

- Faster software delivery
- Continuous integration and deployment
- Improved system reliability
- Automation of repetitive tasks
- Better collaboration across teams

---

## 2. Setting Up Your Linux Environment

Most DevOps tools run best on **Linux-based environments**. You can either:

- Use a Linux machine
- Set up a virtual machine with **Vagrant** (cross-platform)
- Use Windows Subsystem for Linux (WSL) on Windows

**Recommended Linux distribution:** Ubuntu 22.04 LTS  

### Installing Basic Packages
```bash
sudo apt update
sudo apt install -y git curl wget build-essential
```

### Task lists

- [x] Finish my changes
- [ ] Push my commits to GitHub

### Emphasis

Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_ [I'm an inline-style link](https://www.google.com)

~~Strikethrough~~


![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")


```
using System.IO.Compression;

#pragma warning disable 414, 3021

namespace MyApplication
{
    [Obsolete("...")]
    class Program : IInterface
    {
        public static List<int> JustDoIt(int count)
        {
            Console.WriteLine($"Hello {Name}!");
            return new List<int>(new int[] { 1, 2, 3 })
        }
    }
}
```



| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |