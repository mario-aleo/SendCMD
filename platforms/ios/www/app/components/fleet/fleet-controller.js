'use strict';

angular.module('ngapp').controller('FleetController', function(global, fleetService, $state){
    
    var ctrl = this;
    
    var fleetList = function(){
        fleetService.fleet({"key": global.info.key, "cliID": global.info.cliID, "lat": global.info.lat, "lon": global.info.lon})
        .success(function(data){
            ctrl.listFleet = data.objects;
        })
        .error(function(err){
            alert('Sem canxão');
        });
    };
    
    ctrl.goToFleetDetails = function(id){
        $state.go('fleetDetails', {fleetId: id});
    };
    
    fleetList();
});