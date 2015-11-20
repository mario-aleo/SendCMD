'use strict';

angular.module('ngapp').directive('loading', function($rootScope) {
  return {
    restrict: 'E',
    template: "<div ng-show='isStateLoading' class='loading-indicator' layout layout-align='center center' style='width: 100%; height: 100%; background-color: #3F51B5;'>" +
              "<span class='spinner'><wave-spinner></wave-spinner></span>" +
              "</div>",
    replace: true,
    link: function(scope, elem, attrs) {
      scope.isStateLoading = false;

      $rootScope.startload = function(){
        scope.isStateLoading = true;
      };

      $rootScope.endload = function(){
        scope.isStateLoading = false;
      };

      /*$rootScope.$on('$stateChangeStart', function() {
        scope.isStateLoading = true;
      });

      $rootScope.$on('$viewContentLoaded', function() {
        scope.isStateLoading = false;
      });*/
    }
  };
});
