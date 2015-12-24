{
  "title": "Django on Google App Engine Part 1: Memcache",
  "published": "2014-10-16 09:57",
  "categories": ["django", "GAE", "memcache"],
  "authors": ["Paul Bailey"]
}

<img class="center" src="https://bf887cb0698e0d75ce76e89c95d6859510a8d9e3.googledrive.com/host/0B-GD95vnz4VFcjg0VUp1QnA4ZWM/memcached_banner75.jpg" style="width: 100%; display: block;">

Not too long ago you had to use some seriously hacked solutions like Django Non-rel or strip out a lot of components to get Django running on Google App Engine. Since the introduction of [CloudSQL](https://cloud.google.com/sql/), you can pretty much run a standard Django install on App Engine. You still have some restrictions and it takes quite a few little tweaks to get things running, but it is doable. I still have some gripes with App Engine but I'm sticking with it because of Google's new [Managed VM Service](https://cloud.google.com/appengine/docs/managed-vms/). The Managed VM service basically gives you App Engine without all the constraints. This is great because you get the power of Google's services like the Datastore, Memcache, Logging, Task Queues, etc and the flexibility to use more Python libraries. I also like to start a project with more constrained services like GAE or Heroku because they often help you to develop an application that is more portable and easy to scale. So if the service does not work out for me in the long run, at least I can move it fairly quickly.

Another, one of my favorite things to do with App Engine, is to use standard Django and the admin to manage my normal everyday models in CloudSQL, but then also have the Google Datastore to store things that SQL isn't really good at. I also love having the Task Queue so I don't have to manage or setup a queue service of my own like Celery or Redis Queue.

In theory, this all sounds great. But like I mentioned, there are some tweaks you'll need to do to gain all this power. App Engine comes with a Memcache service, but in order to use it with Django you'll need to create a custom cache backend. It all works the same, the trick is you just have to use Google's supplied memcache library to access their service. Your first step is to write a memcache backend like below:

```python
import django.core.cache.backends.memcached as django_memcached

class MemcachedCache (django_memcached.MemcachedCache):
  def __init__ (self, server, params):
    from google.appengine.api import memcache
    
    django_memcached.BaseMemcachedCache.__init__(
      self,
      server,
      params,
      library=memcache,
      value_not_found_exception=ValueError
    )
```

Now in your settings update your CACHES to something like the following. The BACKEND setting will change depending on what file you placed the class in.

```python
CACHES = {
  'default': {
    'BACKEND': 'ndrive.cache.MemcachedCache',
  }
}
```

Note, App Engine does support namespacing in Memcache, so if you need to be more advanced, you can definitely come up with a backend for that.

Look for more tips and tricks to come on this blog about Django in Google App Engine.