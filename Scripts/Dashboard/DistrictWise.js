define(['app'], function (app) {
    app.controller("districtWise", function ($scope, $rootScope, $location, $timeout, $http, $window, $filter, $log) {
        $scope.hide = false;
        $scope.State = sessionStorage.getItem("stateName");

        $http.get("https://api.steinhq.com/v1/storages/5e732accb88d3d04ae0815ae/StateWiseHealthCapacity").then(
            function (response) {
                $scope.hide = false;
                $scope.error = response.status;
                $log.info($scope.error);

                $scope.districtWise = response.data;
                $scope.district = [];

                for (let stateName in $scope.districtWise) {
                    let stateData = $scope.districtWise[stateName];
                    if (stateData.State && stateData.State.toLowerCase() === $scope.State.toLowerCase())
                    {
                        $scope.district.push({
                            stateName: stateData.State,
                            ruralHospitals: stateData.RuralHospitalsCount,
                            ruralBeds: stateData.RuralBeds,
                            urbanHospitals: stateData.UrbanHospitals,
                            urbanBeds: stateData.UrbanBeds,
                            totalHospitals: stateData.TotalHospitalsCount,
                            totalBeds: stateData.TotalBedsCount,
                            lastUpdated: stateData.LastUpdated
                        });
                    }
                }
            },
            function (error) {
                $scope.error = error.status;
                $scope.hide = true;
                $log.info($scope.error);
            }
        );

        $scope.back = function () {
            $location.path("Covid19");
        };
    });
});


