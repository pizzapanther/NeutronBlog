function tpl (path) {
  return 'templates/' + path;
}

function img (path) {
  return 'img/' + path;
}

var napp = angular.module('NeutronApp', ['ngMaterial', 'ngRoute', 'angularMoment']);

napp.config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
});

napp.config(function ($routeProvider, $mdThemingProvider) {
  $routeProvider
    .when('/',
      {controller:'ListController', templateUrl: tpl('list.html')})
    .when('/blog/post/:year/:slug',
      {controller:'PostController', templateUrl: tpl('post.html')});
      
  $mdThemingProvider.theme('default')
    .primaryPalette('amber')
    .accentPalette('blue');
});

napp.run(function ($rootScope) {
  
});
