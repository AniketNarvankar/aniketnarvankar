define(['app'], function (app) {
    app.controller("districtWise", ['$scope', '$rootScope', '$location', '$timeout', '$mdSidenav', '$http', '$window', '$filter', '$mdDialog', '$cryptojsAHC','$log', function ($scope, $rootScope, $location, $timeout, $mdSidenav, $http, $window, $filter, $mdDialog, $cryptojsAHC,$log) {

        $scope.hide = false;

        $scope.State = sessionStorage.getItem('stateName');
        $http.get('https://api.covid19india.org/state_district_wise.json').then(function (response) {
            $scope.hide = false;
            $scope.error = response.status;
            $log.info($scope.error);

            $scope.districtWise = response.data;
            $scope.district = [];
            for (var key in $scope.districtWise) {
                for (var name in $scope.districtWise[key].districtData) {
                    $scope.district.push({
                        stateName: key,
                        districtName: name,
                        active: $scope.districtWise[key].districtData[name].active,
                        confirmed: $scope.districtWise[key].districtData[name].confirmed,
                        deceased: $scope.districtWise[key].districtData[name].deceased,
                        recovered: $scope.districtWise[key].districtData[name].recovered,
                        stateCode: $scope.districtWise[key].statecode
                    })
                }
            }
        }, function (reason) {
            $scope.error = reason.status;
            $scope.hide = true;
            $log.info($scope.error);
            
        })

        $scope.back = function () {
            $location.path('Covid19');
        }
        
        

    }])
});