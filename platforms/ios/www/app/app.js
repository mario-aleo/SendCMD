'use strict';

angular.module('ngapp', [ 'ngTouch', 'ui.router', 'uuid4', 'angular-uuid', 'jsonrpc', 'ngMdIcons', 'ngMaterial', 'ngCordova' ])

.run(function($rootScope, $cordovaDevice){
  document.addEventListener("deviceready", function () {
    $rootScope.$watch("window.StatusBar", function() {
      StatusBar.overlaysWebView(false);
      StatusBar.backgroundColorByName("black");
      $rootScope.$apply();
    });
  }, false);
});
