'use strict';

angular.module('ngapp').service('detailService', function(jsonrpc){
    var service = jsonrpc.newService('Comandos', 'WebApi');
    this.list = service.createMethod('ListaComandos');
    this.send = service.createMethod('EnviaComando');
})

.directive('detailRepeat', function($rootScope){
  return function(scope, element, attrs) {
    if (scope.$last){
      $rootScope.endload();
    }
  };
});;
