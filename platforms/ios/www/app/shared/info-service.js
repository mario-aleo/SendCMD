'use strict';

angular.module('ngapp').service('global', function($state, $rootScope){
    
    this.info = { 
        key: '{C3C5B6E6-1B50-4853-847E-016F69F28E56}', 
        cliID: null,
        usuID: null,
        seeCmd: null,
        grpID: null,
        user: null,
        lat: null,
        lon: null
    };
    
    this.pinList = {
        showPoi: false,
        showArea: false
    };
});