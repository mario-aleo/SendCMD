'use strict';

angular.module('ngapp').controller('AppController', function(global, $scope, $state, $timeout, $mdSidenav, $mdComponentRegistry){ 
    
    var ctrl = this;
    
    ctrl.showNavBar = false;
    
    ctrl.toggle = angular.noop;
    
    ctrl.isOpen = function() { return false };
    $mdComponentRegistry
    .when('right')
    .then( function(sideNav){
      ctrl.isOpen = angular.bind( sideNav, sideNav.isOpen );
      ctrl.toggle = angular.bind( sideNav, sideNav.toggle );
    });
    
    ctrl.toggleRight = function() {
    $mdSidenav('right').toggle()
        .then(function(){
        });
    };
    
    ctrl.close = function() {
    $mdSidenav('right').close()
        .then(function(){
        });
    };
    
    $scope.currState = $state;
    
    $scope.$watch('currState.current.title', function(newValue, oldValue) {
        if (newValue === oldValue){
            return; 
        }
        ctrl.title = $state.current.title;
        if(ctrl.title == 'Login'){
            ctrl.showNavBar = false;
        } else{
            ctrl.showNavBar = true;
        }
        
        if(ctrl.title == 'My Fleet'){
            ctrl.back = function(){
                $state.go('login');  
            };
        }
        if(ctrl.title == 'Notificações'){
            ctrl.back = function(){
                $state.go('main');  
            };
        }
        if(ctrl.title == 'Frota'){
            ctrl.back = function(){
                $state.go('main');  
            };
        }
    }, true);
});

