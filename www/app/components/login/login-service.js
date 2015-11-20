'use strict';

angular.module('ngapp').service('loginService', function(jsonrpc){
    var service = jsonrpc.newService('login', 'WebApi');
    this.login = service.createMethod('ValidateUser');
});
