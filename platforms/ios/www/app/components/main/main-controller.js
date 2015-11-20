'use strict';

angular.module('ngapp').controller('MainController', function(uiGmapGoogleMapApi, mainService, loginService, $cordovaGeolocation, global, $state, $cordovaDialogs, $scope, $rootScope){
    
    var ctrl = this;
    
    
    var pos = 0;
    
    
    ctrl.locked = false;
    
    
   /* if(global.info.cliID === null || global.info.usuID === null){
        $state.go('login');
    }*/
    
    
    uiGmapGoogleMapApi.then(function(maps) {
        if(ctrl.lat == null || ctrl.lon == null){
            ctrl.lat = -23.5475000;
            ctrl.lon = -46.6361100;
        }
        ctrl.map = { 
            center: { 
                latitude: ctrl.lat, 
                longitude: ctrl.lon 
            },
            zoom: 8,
            markers: [],
            option: {
                disableDefaultUI: true,
                disableDoubleClickZoom: true
            },
            event: {
                mousedown: function(){
                    ctrl.locked = false;
                },
                dragstart: function(){
                    ctrl.locked = true
                },
                drag: function(){
                    ctrl.locked = true
                },
                dragend: function(){
                    ctrl.locked = true
                },
                mouseup: function (map, eventName, originalEventArgs) {
                    if(ctrl.locked == true){
                        return;
                    }
                    
                    var args = originalEventArgs[0];
                    var lat = args.latLng.lat(),lon = args.latLng.lng();
                    var marker = {
                        id: ctrl.map.markers.length + 1,
                        coords: {
                            latitude: lat,
                            longitude: lon
                        },
                        name: null,
                        tpo: null
                    };
                    
                    $cordovaDialogs.prompt('Digite um nome e selecione o tipo:', 'Novo Pin', ['POI','Area'], null)
                    .then(function(result) {
                        var input = result.input1;
                        // no button = 0, 'OK' = 1, 'Cancel' = 2
                        var btnIndex = result.buttonIndex;
                        
                        if(btnIndex == 1){
                            mainService.poi({"key": global.info.key, "cliID": global.info.cliID, "lat": lat, "lon": lon, "nome": input})
                            .success(function(data){
                                alert("Ponto de Interece criado com sucesso");
                                marker.name = input;
                                marker.tpo = btnIndex;
                                ctrl.map.markers.push(marker);
                                $scope.$apply();
                            })
                            .error(function(err){
                                alert("Não foi possivel criar o ponto.");
                                return;
                            });
                        } else{
                            alert("Função não implementada !");
                            return;
                        }
                    });
                }
            },
            control: {}
        }
    });
    
    
    var watch = $cordovaGeolocation.watchPosition();
    watch.then(
        null,
        function(err) {
            //err
        },
        function(position) {
            ctrl.lat  = position.coords.latitude
            ctrl.lon = position.coords.longitude
            if(pos == 0){
                ctrl.map.control.refresh({latitude: ctrl.lat, longitude: ctrl.lon});
                pos = 1;
            } 
        }
    );
    
    
    ctrl.goToNotification = function(){
        if(global.info.grpID == null){
            var grp = function(){
                loginService.grp({"key": global.info.key, "usuID": global.info.usuID})
                .success(function(data){
                    if(data.value == 0){
                        global.info.grpID = data.value;
                    } else{
                        global.info.grpID = data.objects[0].grpID;
                    }
                })
                .error(function(err){
                    global.info.grpID = -2;
                });
            };
            grp();
        }
        if(global.info.grpID == -2){
            alert('Sem Notificações');
        } else{
            $state.go('notify');   
        }
    };
    
    
    ctrl.goToFleet = function(){
        $state.go('fleet');
    }
    
    
    var doOnOrientationChange = function(){
        switch(window.orientation){  
            case -90:
                document.getElementById("content").style.height = '90%';
                document.getElementById("menu-map").style.height = '60%';
                if(document.getElementById("menu-map").offsetHeight < (document.body.offsetHeight - ((document.body.offsetHeight * 50) / 100))){
                    document.getElementById("menu-map").style.minHeight = '50%';
                }
                ctrl.map.control.refresh({latitude: ctrl.lat, longitude: ctrl.lon});
                break;
            case 90:
                document.getElementById("content").style.height = '90%';
                document.getElementById("menu-map").style.height = '60%';
                if(document.getElementById("menu-map").offsetHeight < (document.body.offsetHeight - ((document.body.offsetHeight * 50) / 100))){
                    document.getElementById("menu-map").style.minHeight = '50%';
                }
                ctrl.map.control.refresh({latitude: ctrl.lat, longitude: ctrl.lon});
                break;
            default:
                document.getElementById("content").style.height = '100%';
                document.getElementById("menu-map").style.height = '65%';
                ctrl.map.control.refresh({latitude: ctrl.lat, longitude: ctrl.lon});
                break;
        }
    };

    
    window.addEventListener('orientationchange', doOnOrientationChange);
});