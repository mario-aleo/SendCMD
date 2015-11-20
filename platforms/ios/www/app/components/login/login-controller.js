'use strict';

angular.module('ngapp').controller('LoginController', function(global, loginService, $state, $scope, $cordovaDevice, $rootScope){
    var ctrl = this;
    
    ctrl.platf = $rootScope.platform;
    
    ctrl.msg = 'Usuario / Senha Invalido';
    
    ctrl.showMsg = false;
    
    ctrl.user = global.info.user || null;
    
    ctrl.passwd = null;
    
    global.info.cliID = null;
    
    global.info.usuID = null;
    
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
    
    ctrl.validate = function(){
        loginService.login({"key": global.info.key, "user": ctrl.user, "pass": ctrl.passwd, "tipo": 0})
        .success(function(data){
            if(data.value == -1 || data.value == 0){
                document.getElementById('loginMsg').style.width = '178px';
                ctrl.msg = 'Usuario / Senha Invalido';
                ctrl.showMsg = true;
                ctrl.passwd = '';
            } else{
                ctrl.showMsg = false;
                global.info.cliID = data.objects[0].cliID;
                global.info.usuID = data.objects[0].usuID;
                global.info.seeCmd = data.objects[0].visualizaComandos;
                global.info.user = ctrl.user;
                grp();
                ctrl.msg = 'Sucesso';
                $state.go('main');
            }
        })
        .error(function(err){
            document.getElementById('loginMsg').style.width = '104px';
            ctrl.msg = 'Sem conexão';
            ctrl.showMsg = true;
            ctrl.passwd = '';
        });
    };   
    
    if(ctrl.platf !== 'iOS'){
        var min = document.getElementById('loginCard').offsetHeight;
        document.getElementById('loginCard').style.minHeight = min + 'px';
    }
});