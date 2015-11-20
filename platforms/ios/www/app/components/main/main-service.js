'use strict';

angular.module('ngapp').service('mainService', function(jsonrpc){
    var service = jsonrpc.newService('poisvc', 'http://rastrear.golsat.com.br/wsi/mobilev5/delegates.ashx');
    this.poi = service.createMethod('CadastraPOI');
});