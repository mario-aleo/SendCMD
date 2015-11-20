'use strict';

angular.module('ngapp').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    
    $urlRouterProvider.otherwise('/main');
    
    $stateProvider.state('main', {
        url: '/main',
        templateUrl: 'app/components/main/main.html',
        title: 'My Fleet',
        controller: 'MainController',
        controllerAs: 'main'
    })
    .state('login', {
        url: '/login',
        templateUrl: 'app/components/login/login.html',
        title: 'Login',
        controller: 'LoginController',
        controllerAs: 'login'
    })
    .state('notify', {
        url: '/notify',
        templateUrl: 'app/components/notification/notification.html',
        title: 'Notificações',
        controller: 'NotificationController',
        controllerAs: 'notify'
    })
    .state('fleet', {
        url: '/fleet',
        templateUrl: 'app/components/fleet/fleet.html',
        title: 'Frota',
        controller: 'FleetController',
        controllerAs: 'fleet'
    })
    .state('fleetDetails', {
        url: '/fleet/:fleetId',
        templateUrl: 'fleetdetails.html',
        controller: 'FleetDetailsController',
        controllerAs: 'details'
    });
    
}]);