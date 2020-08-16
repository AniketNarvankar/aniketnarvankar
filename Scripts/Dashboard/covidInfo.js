define(['app'], function (app) {
    app.controller("covidController", ['$scope', '$rootScope', '$location', '$timeout', '$mdSidenav', '$http', '$window', '$filter', '$mdDialog', '$cryptojsAHC', function ($scope, $rootScope, $location, $timeout, $mdSidenav, $http, $window, $filter, $mdDialog, $cryptojsAHC) {
        $scope.back = function () {
            $location.path('Covid19');
        }

    }])
})