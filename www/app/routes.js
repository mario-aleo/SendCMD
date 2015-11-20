'use strict';

angular.module('ngapp').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/login');

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
    .state('detail', {
        url: '/detail/:veiculoID',
        templateUrl: 'app/components/detail/detail.html',
        params: { veiculoData: null },
        controller: 'DetailController',
        controllerAs: 'detail'
    });

}]);
