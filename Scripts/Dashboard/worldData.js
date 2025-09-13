 define(['app'], function (app) {
    app.controller("worldController", function ($scope, $location, $http,$window) {
        $scope.reloadData = function () {
            $window.location.reload();
        };
        $scope.hide = false;

        $http.get("https://covid-api.com/api/reports/total").then(
            function (response) {
                $scope.worldInfo = {
                    TotalConfirmed: response.data.data.confirmed,
                    TotalDeaths: response.data.data.deaths,
                    TotalRecovered: response.data.data.recovered
                };
            },
            function (error) {
                $scope.error = error;
                $scope.hide = true;
            }
        );

        $http.get("https://covid-api.com/api/reports").then(
            function (response) {
                $scope.hide = false;
                $scope.dataCountryWise = response.data.data.map(function (entry) {
                    return {
                        Country: entry.region.name,
                        TotalConfirmed: entry.confirmed,
                        TotalDeaths: entry.deaths,
                        TotalRecovered: entry.recovered
                    };
                });
            },
            function (error) {
                $scope.error = error;
                $scope.hide = true;
            }
        );
        $scope.back = function () {
            $location.path("Covid19");
        };
    });
});
 
