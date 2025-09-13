define(['app'], function (app) {
    app.controller("covidController", function ($scope, $location) {
        $scope.back = function () {
            $location.path("Covid19");
        };
    });
});
