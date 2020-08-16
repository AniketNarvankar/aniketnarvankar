define(['ui-router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngMessages', 'ngMaterial', 'ngIdle', 'ngAria', 'ngTouch', 'cryptojsProvider', 'cgBusy', 'MassAutoComplete', 'btorfs.multiselect', 'ng.deviceDetector', 'reTree', 'tc.chartjs'], function () {

    //defining angularjs module
    var app = angular.module("app", ['ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngMessages', 'ngMaterial', 'ngIdle', 'ngAria', 'ngTouch', 'cryptojsProvider', 'wt.responsive', 'cgBusy', 'MassAutoComplete', 'btorfs.multiselect', 'ng.deviceDetector', 'reTree','tc.chartjs']);
 
    //manual bootstrap
    app.init = function () {
        angular.bootstrap(document, ['app']);
    };
     

    ////////////////////////// Angular Online Offline/////////////////////////////////////////
    app.run(function ($window, $rootScope, $location, $mdDialog, Idle) {

        $rootScope.previousLocation = "";
        $rootScope.actualLocation = "";

        // Start // Uncomment it for Local host

        $rootScope.online = navigator.onLine;
        $window.addEventListener("offline", function () {
            $rootScope.$apply(function () {
                $rootScope.online = false;
            });
        }, false);
        $window.addEventListener("online", function () {
            $rootScope.$apply(function () {
                $rootScope.online = true;
            });
        }, false);

        // End //

        // Start // Uncomment it for Mobile 
        //document.addEventListener("offline", onOffline, false);
        //function onOffline() {
        //    //alert('You are Offline');
        //    $rootScope.$apply(function () {
        //        $rootScope.online = false;
        //    });
        //}
        //document.addEventListener("online", onOnline, false);
        //function onOnline() {
        //    //alert('You are Online');
        //    $rootScope.$apply(function () {
        //        $rootScope.online = true;
        //    });
        //}
        // End //

        $rootScope.checkConnection = function () {
            var networkState = navigator.connection.type;
            var states = {};
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL_2G] = 'Cell 2G connection';
            states[Connection.CELL_3G] = 'Cell 3G connection';
            states[Connection.CELL_4G] = 'Cell 4G connection';
            states[Connection.CELL] = 'Cell generic connection';
            states[Connection.NONE] = 'No network connection';
            //alert('Connection type: ' + states[networkState]);
            if (networkState != Connection.NONE) {
                return true;
            }
            else {
                return false;
            }
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // Prevent the browser default action (Going back)

            $rootScope.previousLocation = $rootScope.actualLocation;
            $rootScope.actualLocation = $location.path();

            //console.log($rootScope.previousLocation);
            //console.log($rootScope.actualLocation);
            //console.log(next);
            //console.log(current);
            //if (($rootScope.actualLocation.replace("/", "") == 'login')
            //    && ($rootScope.previousLocation.replace("/", "") != '')) {
            //    debugger;
            //    if (!confirm("Are you sure you want to Logout?")) {
            //        event.preventDefault();
            //        return;
            //    }
            //    sessionStorage.setItem('UN', '');
            //    //$rootScope.showConfirm(event);
            //}
            //if ((($window.sessionStorage.getItem('UN') == null) || ($window.sessionStorage.getItem('UN') == ''))
            //    && ((($rootScope.previousLocation.replace("/", "") == 'login') && ($rootScope.actualLocation.replace("/", "home")))
            //    || (($rootScope.previousLocation.replace("/", "")) == ($rootScope.actualLocation.replace("/", ""))))) {
            //    event.preventDefault();
            //    //alert('This');
            //}
            //alert($window.sessionStorage.getItem('UN'));
            //alert("$rootScope.previousLocation : " + $rootScope.previousLocation);
            //alert("$rootScope.actualLocation : " + $rootScope.actualLocation);
        });

        /* Idle Timeout */
        if (sessionStorage.length != 0) {
            Idle.watch();
        }
        /*End*/
    });
    //////////////////////////////////////////////////////////////////////////////////////////

    //defining routes
    app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider, $mdAriaProvider, IdleProvider, KeepaliveProvider) {
         
         
        $urlRouterProvider.otherwise("/Covid19");

        //$locationProvider.html5Mode(true);

        $stateProvider.state("Covid19", {
            url: "/Covid19",
            templateUrl: 'HTML/Covid19.html',
            controller: 'covid19'
        }).state("DistrictWise", {
            url: "/DistrictWise",
            templateUrl: 'HTML/DistrictWise.html',
            controller: 'districtWise'
        }).state("worldData", {
            url: "/worldData",
            templateUrl: 'HTML/World.html',
            controller: 'worldController'
        }).state("covidInfo", {
            url: "/covidInfo",
            templateUrl: 'HTML/covidInfo.html',
            controller: 'covidController'
        });

        /* Idle Timeout */
        IdleProvider.idle(300);
        IdleProvider.timeout(20);
        KeepaliveProvider.interval(20);
        /* End */

        //$locationProvider.html5Mode(true);
        //$locationProvider.hashPrefix('!');
        $mdAriaProvider.disableWarnings();
    });

 

    return app;
});