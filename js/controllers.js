napp.controller('GlobalController', function ($scope, $mdDialog) {
  $scope.tpl = tpl;
  $scope.img = img;
  
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
});

napp.controller('ListController', function ($scope, $location, DataService) {
  var search = $location.search();
  
  $scope.page = parseInt(search.page || 1);
  
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
  };
  
  DataService.get_post(path).then(
    $scope.load_post,
    function () {
      $scope.show_error('Error loading blog post.');
    }
  );
});
