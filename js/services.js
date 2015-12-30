napp.service('DataService', function ($http) {
  DataService = this;
  
  DataService.get_posts = function (page) {
    return $http.get('/blog/data/page-' + page + '.json');
  };
  
  DataService.get_post = function (path) {
    return $http.get('/blog/posts/' + path + '.md');
  };
  
  DataService.parse_post = function (body) {
    var c;
    var content = '';
    var opens = 0;
    var metadata = null;
    
    for (var i=0; i < body.length; i++) {
      c = body.charAt(i);
      content = content + c;
      
      if (c == '{' && !metadata) {
        if (opens === 0) {
          content = c;
        }
        
        opens = opens + 1;
      }
      
      else if (c == '}') {
        opens = opens - 1;
        
        if (opens === 0) {
          try {
            metadata = JSON.parse(content);
          }
          
          catch (error) {
            metadata = {};
          }
          content = '';
        }
      }
    }
    
    return {metadata: metadata, content: content};
  };
  
  return DataService;
});
