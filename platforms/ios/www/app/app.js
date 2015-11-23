'use strict';

angular.module('ngapp', [ 'ngTouch', 'ui.router', 'uuid4', 'angular-uuid', 'jsonrpc', 'ngMdIcons', 'ngMaterial', 'ngCordova', 'angular-spinkit' ])

.run(function($rootScope, $cordovaDevice, $state){
  document.addEventListener("deviceready", function () {
    $rootScope.$watch("window.StatusBar", function() {
      StatusBar.overlaysWebView(false);
      StatusBar.backgroundColorByName("black");
      $rootScope.$apply();
    });
    window.plugins.orientationLock.lock("portrait");
    document.addEventListener("backbutton", function (e) {
      if($state.is('login')){
        navigator.app.exitApp();
      } else if($state.is('main')){
        $rootScope.endload();
        $state.go('login');
      } else if($state.is('detail')){
        $rootScope.endload();
        $state.go('main');
      } else{
        e.preventDefault();
      }
    }, false );
  }, false);
});
