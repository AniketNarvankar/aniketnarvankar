define(['app'], function (app) {
    app.controller("worldController", ['$scope', '$rootScope', '$location', '$timeout', '$mdSidenav', '$http', '$window', '$filter', '$mdDialog', '$cryptojsAHC','$window', function ($scope, $rootScope, $location, $timeout, $mdSidenav, $http, $window, $filter, $mdDialog, $cryptojsAHC,$window) {
        $scope.reloadData = function () {
            $window.location.reload();
        }



        $scope.hide = false;
        $http.get('https://api.covid19api.com/summary').then(function (response) {
            $scope.hide = false;
            $scope.worldInfo = response.data.Global;
            $scope.dataCountryWise = response.data.Countries;
        }, function (reason) {
            $scope.error = reason;
            $scope.hide = true;
        })

        $scope.back = function () {
            $location.path('Covid19');
        }
         
         
    }])
})