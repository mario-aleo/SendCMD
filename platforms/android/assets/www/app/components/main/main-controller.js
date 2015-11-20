'use strict';

angular.module('ngapp').controller('MainController', function($rootScope, global, mainService, $state){

  if(global.info.cliID == null || global.info.usuID == null){
    $rootScope.endload();
    $state.go('login');
  }

  $rootScope.startload();

  var ctrl = this;

  this.eqpList;

  this.listEqpEspelhados = function(){
    alert("key" + global.info.key + " cliID" + global.info.cliID + " lat" + 0 + " lon" + 0 + " usuID" + global.info.usuID + " tipo" + 18);
    mainService.list({"key": global.info.key, "cliID": global.info.cliID, "lat": 0, "lon": 0, "usuID": global.info.usuID, "tipo": 18})
      .success(function(data){
        if(data.value == -1 || data.value == 0){
          console.log("Error: Nothing Here ");
        } else{
          console.log("Success: List Loaded");
          ctrl.eqpList = data.objects;
          alert(JSON.stringify(data.objects));
        }
      })
      .error(function(err){
        console.log("Error " + err + ": Sem Conexão");
      });
  };

  this.listEqpEspelhados();

});
