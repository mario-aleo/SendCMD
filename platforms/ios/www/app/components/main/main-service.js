'use strict';

angular.module('ngapp').service('mainService', function(jsonrpc){
    var service = jsonrpc.newService('eqpEspelhados', 'WebApi');
    this.list = service.createMethod('CapturaEquipamentosEspelhados');
})

.directive('mainRepeat', function($rootScope){
  return function(scope, element, attrs) {
    if (scope.$last){
      $rootScope.endload();
    }
  };
});
