{
  "title": "The Undocumented Guide to Using SSL on Google App Engine",
  "published": "2014-10-10 10:58",
  "categories": ["GAE", "SSL"],
  "authors": ["Paul Bailey"]
}

<img class="right" src="https://bf887cb0698e0d75ce76e89c95d6859510a8d9e3.googledrive.com/host/0B-GD95vnz4VFcjg0VUp1QnA4ZWM/appengine_final.png" style="width: 300px;">Getting SSL working on Google App Engine (GAE) can be very frustrating because number one, SSL is confusing to most and number two, the documentation is out of date. The big problem is you have to use the Google Apps Admin Console to deploy SSL now, but since that switch, the documentation has never been updated. So here is the guide to using SSL with GAE. I’m starting from the beginning of purchasing an SSL certificate since a lot of people have maybe never purchased or generated a certificate. These directions are for [SNI](http://en.wikipedia.org/wiki/Server_Name_Indication) which is a newer standard that older browsers do not support. So you may need to use purchase an IP address from GAE if you need to support older browsers. However, it is a pretty safe bet nowadays that your browser supports SNI.

## 1. Purchase an SSL Certificate

You can purchase your certificate from many places and you can get them very cheaply. Don’t be afraid of the cheap guys too much because most of them just resell their certificates from other providers. So if you see Comodo, RapidSSL, or GeoTrust listed on the product you’re probably ok. I use NameCheap.com which will sell you a certificate for less than $10. The cheaper certificates are usually verified by e-mail so make sure you have access to e-mail for your domain to approve the certificate. The steps following are what I used to generate a Positive SSL certificate from NameCheap.com.

From a Linux or Mac computer with OpenSSL run the following command. This command will generate your private key and certificate request you will need.
```
openssl req -nodes -newkey rsa:2048 -keyout myserver.key -out server.csr
```

The output looks something like the following. Note the parts after colons are example input you might enter and common name is the domain name you’re purchasing the certificate for. Skip the last two questions to make the process easier.

```
Generating a 2048 bit RSA private key
.....+++
......+++
unable to write 'random state'
writing new private key to 'myserver.key'
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:US
State or Province Name (full name) [Some-State]:Texas
Locality Name (eg, city) []:League City
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Digital Grok
Organizational Unit Name (eg, section) []:Development
Common Name (e.g. server FQDN or YOUR name) []:www.example.com         
Email Address []:paul@example.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
```

Now go over to NameCheap.com or whoever and purchase your certificate. In NameCheap.com after your purchase you then need to go to “Activate Now”.

Once on the activation form, your server type is either **Apache or Nginx**, doesn’t really matter. You will then take the contents of your **server.csr** and paste it into the box and submit the form. Like I mentioned earlier, you will approve this via e-mail so on the next screen choose an e-mail address you have access to so you can approve the request. You will also be asked for contact info, so fill that in.

Once everything gets approved, you’ll get your certificate sent to you in a zip file.

## 2. Get your certificate ready for App Engine

First unzip your certificates. In the zip will be your certificate and certificates from your provider. Next we have to convert our private key to a format GAE can understand:
```
openssl rsa -in myserver.key -text > myserver.key.pem
```

Finally we have to combine all of our certificates into one file, like so.  I don’t know if the order matters but this seems to work for me.
```
cat www_example_com.crt COMODORSADomainValidationSecureServerCA.crt COMODORSAAddTrustCA.crt AddTrustExternalCARoot.crt > bundle.crt
```

## 3. Upload Your Certificate

Ok this is the last part. To get through this part, I’m assuming you have setup your domain name already for GAE and you are an admin on your Google Apps domain.  Also you need to be an owner of the App Engine app.

1.  From the Admin home screen ([admin.google.com](https://admin.google.com)) to go **Security**. You may need to hit **Show More** if you don’t see it.
1. Once on Security click **Show More** and **SSL for Custom Domains**.
1. Put in your GAE application ID and enable SSL.
1. Increase SNI slots by 5 then **Configure SSL Certificates** and **Upload a New Certificate**
1. Your bundle.crt is the X.509 certificate and your key is the myserver.key.pem file.
1. Finally, set the serving mode to **SNI Only**, and add a matching URL for the domain your setting up.
1. Lastly, **Save Changes** and you’re done!


