function tpl (path) {
  return 'templates/' + path;
}

function img (path) {
  return 'img/' + path;
}

var napp = angular.module('NeutronApp', ['nb.blog', 'ngMaterial', 'ngRoute', 'angularMoment']);

napp.config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
});

napp.config(function ($routeProvider, $mdThemingProvider) {
  $routeProvider
    .when('/',
      {controller:'nbBlogListController', templateUrl: tpl('list.html')})
    .when('/blog/post/:year/:slug',
      {controller:'nbBlogPostController', templateUrl: tpl('post.html')});
      
  $mdThemingProvider.theme('default')
    .primaryPalette('amber')
    .accentPalette('blue');
});

napp.run(function ($rootScope) {
  
});

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
