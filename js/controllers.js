napp.controller('GlobalController', function ($scope, $mdDialog) {
  $scope.tpl = tpl;
  $scope.img = img;
  var title = "Neutron Drive Blog";
  
  $scope.set_title = function (t) {
    if (t) {
      $scope.title = t + " | " + title;
    }
    
    else {
      $scope.title = title;
    }
  };
  
  $scope.show_error = function (message, event) {
    $mdDialog.show(
      $mdDialog.alert()
        .clickOutsideToClose(true)
        .title('Error!')
        .textContent(message)
        .ariaLabel('Error')
        .ok('OK')
        .targetEvent(event)
    );
  };
  
  $scope.set_title();
});

napp.controller('ListController', function ($scope, $location, DataService) {
  var search = $location.search();
  
  $scope.page = parseInt(search.page || 1);
  $scope.set_title();
  
  $scope.load_posts = function (response) {
    $scope.posts = response.data.posts;
    $scope.total_pages = response.data.total_pages;
    
    if ($scope.page > 1) {
      $scope.page_prev = $scope.page - 1;
    }
    
    if ($scope.page < $scope.total_pages) {
      $scope.page_next = $scope.page + 1;
    }
  };
  
  DataService.get_posts($scope.page).then(
    $scope.load_posts,
    function () {
      $scope.show_error('Error loading blog posts.');
    }
  );
});

napp.controller('PostController', function ($scope, $routeParams, DataService) {
  var path = $routeParams.year + '/' + $routeParams.slug;
  
  $scope.load_post = function (response) {
    $scope.post = DataService.parse_post(response.data);
    $scope.set_title($scope.post.metadata.title);
  };
  
  DataService.get_post(path).then(
    $scope.load_post,
    function () {
      $scope.show_error('Error loading blog post.');
    }
  );
});
