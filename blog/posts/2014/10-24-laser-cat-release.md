{
  "title": "Version 14.10.3 (Laser Cat) Release",
  "published": "2014-10-24 17:19",
  "categories": ["Announcement", "Release"],
  "authors": ["Paul Bailey"],
  "image": "/img/posts/laser-cat.jpg"
}

Version 14.10.3, Laser Cat, was released today. Laser Cat, brings Neutron Beam into Super Neutron Drive. **Warning:** this first release of Neutron Beam does not support request encryption yet. So make sure to use a VPN, SSH tunnel, or a local network that you trust. This also means you have to use the **--no-encrypt** flag right now. If you never used Neutron Beam before, please see our [help page](https://super.neutrondrive.com/help/). Or if you need to upgrade Neutron Beam, follow the directions on the [setup page](https://super.neutrondrive.com/help/neutron-beam-setup) but run `pip install neutron-beam --upgrade` to make sure your old version gets replaced. Look for the Neutron Beam that supports request encryption to come soon.

A quick way to way to setup an encrypted tunnel with SSH is to use the **-L** option like so: `ssh -L 32828:localhost:32828 example.com`

You would then setup your Neutron Beam to use localhost on port 32828. Also make sure to firewall external access to your chosen port.