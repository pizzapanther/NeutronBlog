{
  "title": "Version 14.11.9 (Turducken) Release",
  "published": "2014-11-30 11:41",
  "categories": ["Release", "Announcement"],
  "authors": ["Paul Bailey"],
  "image": "/img/posts/turducken.png"
}

Version 14.11.9 (Turducken) was released to the Chrome Web Store today. In addition to several bug fixes, Turducken contains severval new features. ACE Editor was updated and Neutron now supports new code modes Elixir, Elm, Praat, Eiffel, G-Code, gitignore, Applescript, and Vala. Neutron Beam was also upgraded to version 14.11.3 and now supports multiple encryption keys. This allows you to use Neutron Beams with more than one instance of Neutron Drive opened on multiple computers. Also file viewing was added to Neutron Beams. When viewing files a 30 minute token is created allowing you to view files. After 30 minutes you will need to obtain a new URL in the editor. Also files are limited by an `allowed_files` attribute in your configuration file. You can expand this list manually if you wish to serve additional file types. To upgrade Neutron Beam, simply run `pip install neutron-beam --upgrade`.