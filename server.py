#!/usr/bin/env python3

import os
import sys
import subprocess

import tornado.ioloop
import tornado.web
import tornado.autoreload
import tornado.options
from tornado.log import enable_pretty_logging

PATH = os.path.abspath(os.path.dirname(__file__))

class HubHandler (tornado.web.StaticFileHandler):
  def validate_absolute_path (self, root, absolute_path):
    try:
      return super().validate_absolute_path(root, absolute_path)
      
    except tornado.web.HTTPError as error:
      if error.status_code == 404:
        return os.path.join(PATH, 'index.html')
        
      raise
      
  def parse_url_path (self, url_path):
    if url_path.endswith('/') or not url_path:
      url_path += 'index.html'
      
    return url_path
    
application = tornado.web.Application([
  (r"/(.*)", HubHandler, {'path': PATH}),
])

if __name__ == "__main__":
  kwargs = {'address': '127.0.0.1'}
  
  enable_pretty_logging()
  tornado.autoreload.start()
  
  port = int(os.environ.get('PORT', '8000'))
  
  application.listen(port, **kwargs)
  tornado.ioloop.IOLoop.instance().start()
  