# Vagrant Command-Line Interface
---
This quick tutorial is going to cover about *Vagrant Command-Line interface* through which almost all interaction with Vagrant is done.

### 1. Common Vagrant Commands

#### 1.1. Get Vagrant version

```bash
vagrant --version
```

or

```bash
vagrant --v
```

The output should be similar to below:

```text
Vagrant 2.4.6
```

These commands also can be to check whether Vagrant is ready to work in our environment or not.

#### 1.2. Get status of all Vagrant machines

```bash
vagrant global-status
```

For example, here is the list of VMs and their states on my machine.

```text
id       name   provider   state   directory
----------------------------------------------------
e02c653  srv9   virtualbox running D:/Vagrant/Boxes
4d465c0  srv10  virtualbox running D:/Vagrant/Boxes
1e29065  srv11  virtualbox running D:/Vagrant/Boxes
```

To prune all invalid machines, we can use the command with -prune option:

```bash
vagrant global-status --prune
```

#### 1.3. Add a box

```text
vagrant box add ADDRESS
```

##### 1.3.1. A shorthand name of box

If we start the VM, Vagrant will download the box from the [public catalog of available Vagrant images](https://portal.cloud.hashicorp.com/vagrant/discover)

```bash
vagrant box add bento/ubuntu-22.04
```

##### 1.3.2. Add a remote box specified by URL

```bash
vagrant box add https://portal.cloud.hashicorp.com/vagrant/discover/bento/ubuntu-22.04
```

##### 1.3.3. Add a local box

```bash
vagrant box add jfrog file:///D:/Vagrant/Boxes/boxes/artifactory.box
```

#### 1.4. Remove a box

```bash
vagrant box remove bento/ubuntu-22.04
```

Note: To determine which box should be removed, you may need to list all of the boxes first because some may have multiple versions and providers (VirtualBox, VMware).

To list all the boxes, you can use the command: vagrant box list. For example,

```bash
vagrant box list
```

The output should be similar to below:

```text
bento/ubuntu-22.04                     (virtualbox, 202508.03.0, (amd64))
drifty/ionic-android                   (virtualbox, 0.1.1)
gusztavvargadr/ubuntu-desktop-2204-lts (virtualbox, 2506.0.0, (amd64))
```

##### 1.4.1. Remove a box with shorthand name

```bash
vagrant box remove bento/ubuntu-22.04
```

##### 1.4.2. Remove a box with specific version

```bash
vagrant box remove bento/ubuntu-22.04 -box-version=202206.13.0
```



### 2. Vagrant commands used for boxes

This section covers some basic Vagrant commands that can be used to manage Vagrant boxes.

#### 2.1. List all boxes

We may need to list all the boxes on our PCs, even just to know the names.

```bash
vagrant box list
```

An example output on my console:

```text
bento/ubuntu-22.04                     (virtualbox, 202508.03.0, (amd64))
drifty/ionic-android                   (virtualbox, 0.1.1)
gusztavvargadr/ubuntu-desktop-2204-lts (virtualbox, 2506.0.0, (amd64))
```

### 3. Vagrant commands  used for virtual machines

This section list all Vagrant commands that can be used to manage Vagrant virtual machines which were created from Vagrant Boxes.

#### 3.1. Initialize a new VM

```bash
vagrant init bento/ubuntu-22.04
```

This command will create a configuration file named Vagrantfile in the current directory. The content is similar as below:

```text
Vagrant.configure(2) do |config|
  config.vm.box = "bento/ubuntu-22.04"
end
```

When we start Vagrant in this directory, Vagrant will download the box: bento/ubuntu-22.04 from the internet to local and use it as the image of the VM.

#### 3.2. Start a VM

```bash
vagrant up
```

If we want to start any VM, simply go to the folder which the Vagrantfile exist. The command will start the VM and the output console is as below:

```text
Bringing machine 'default' up with 'virtualbox' provider...
==> default: Box 'bento/ubuntu-22.04' could not be found. Attempting to find a
nd install...
    default: Box Provider: virtualbox
    default: Box Version: >= 0
==> default: Loading metadata for box 'bento/ubuntu-22.04'
    default: URL: https://atlas.hashicorp.com/bento/ubuntu-22.04
==> default: Adding box 'bento/ubuntu-22.04' (202206.13.0) for provider: vir
tualbox
    default: Downloading: https://atlas.hashicorp.com/ubuntu/boxes/trusty64-juju
/versions/202206.13.0/providers/virtualbox.box
==> default: Waiting for cleanup before exiting...
 
    default: Progress: 0% (Rate: 0/s, Estimated time remaining: --:--:--):--)
```

#### 3.3. Get state of a VM

```bash	
vagrant status
```

The above command reports the state of a machine in the current directory.

#### 3.4. SSH to a VM

```bash	
vagrant ssh
```

#### 3.5. Shutdown the VM

Simply go to the folder has the Vagrantfile and issue below command

```bash	
vagrant halt
```

#### 3.6. Destroy the VM


```bash	
vagrant destroy
```

This command will stop the VM and destroy all resources that were created during the machine creation process.

#### 3.7. Suspend a VM

```bash	
vagrant suspend
```

The command will suspend the VM and remember its state.

#### 3.8. Resume a VM


```bash	
vagrant resume
```

The above Vagrant command will resume a suspended machine. Note that the *vagrant up* command will work the same in this case.

#### 3.9. Reload a VM

```bash	
vagrant reload
```

This restarts the VM (equivalent to vagrant halt followed by vagrant up) and applies any changes you made in the Vagrantfile.

```bash	
vagrant halt
vagrant up
```

### 4. Conclusions

The tutorial has shown us about Vagrant Command-Line Interface which can be used to interact with Vagrant.