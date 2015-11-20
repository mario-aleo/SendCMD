'use strict';

angular.module('ngapp').service('fleetService', function(jsonrpc){
    var service = jsonrpc.newService('login', 'http://rastrear.golsat.com.br/wsi/mobilev5/delegates.ashx?test');
    this.fleet = service.createMethod('CapturaEquipamentosEspelhados');
});