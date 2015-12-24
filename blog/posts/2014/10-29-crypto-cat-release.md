{
  "title": "Version 14.10.4 (Crypto Cat) Release",
  "published": "2014-10-29 11:12",
  "categories": ["Release"],
  "authors": ["Paul Bailey"]
}

<img class="right" src="https://bf887cb0698e0d75ce76e89c95d6859510a8d9e3.googledrive.com/host/0B-GD95vnz4VFcjg0VUp1QnA4ZWM/cryptocat.png" style="width: 300px;"> Version 14.10.4, Crypto Cat, was released today. With this release Version 14.10.2 of Neutron Beam was also released. Crypto Cat brings encryption to Neutron Beam so it can be used over untrusted networks. This is the first release of Neutron Beam encryption, so it should be considered in a beta state, and you may expect a few bugs.

Normally with web services, SSL is used to encrypt communications. However, since Neutron Beam is installed by thousands of users on their local development machines, purchasing SSL certificates and installing them would be difficult. Neutron Beam, solves this problem by encrypting all request body content using Fernet encryption. Fernet is a powerful two way encryption technique that uses AES in CBC mode with a 128-bit key for encryption. Neutron Beam also goes further in rotating the encryption keys to make sure requests can not be cracked with brute force.

The encryption key rotation is done via the super.neutrondrive.com server, so servers using Neutron Beam must have internet access. For those without internet access, you can still use Neutron Beam with encryption turned off and use a VPN or trusted network.

If you're ready to get started see the [Neutron Beam setup page](https://super.neutrondrive.com/help/neutron-beam-setup). If you are already using Neutron Beam, checkout out the setup page also to install the required software but then perform `pip install neutron-beam --upgrade`.