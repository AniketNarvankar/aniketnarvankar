define(['app'], function (app) {
    app.controller("covid19", function ($scope, $location, $http, $window) {
        const labels = [];
        const confirmed = [];
        const recovered = [];
        const deceased = [];

        const weeklyLabels = [];
        const weeklyConfirmed = [];
        const weeklyRecovered = [];
        const weeklyDeceased = [];
        $scope.hide = false;

        $scope.reloadData = function () {
            $window.location.reload();
        };

        $scope.worldWise = function () {
            $location.path("worldData");
        };

        $scope.CovidInfo = function () {
            $location.path("covidInfo");
        };

        $http.get("https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise").then(function (response) {
            $scope.covid19Tracker = response.data.data;
        },
            function (error) {
                $scope.error = error;
                $scope.hide = true;
            }
        );

        $scope.getData = function (stateName) {
            $scope.stateData = stateName;
            sessionStorage.setItem("stateName", stateName);
            $location.path("DistrictWise");
        };

        $http.get("https://api.rootnet.in/covid19-in/stats/history").then(function (response) {
            $scope.data1 = response.data.data;
            $.each($scope.data1, function (index, entry) {
                labels.push(entry.day);
                confirmed.push(entry.summary.total);
                recovered.push(entry.summary.discharged);
                deceased.push(entry.summary.deaths);
            });
            $scope.data = {
                labels: labels,
                datasets: [
                    {
                        label: "Total",
                        backgroundColor: "rgba(255, 99, 132, 1)",
                        borderColor: "rgba(255,99,132,1)",
                        data: confirmed,
                        fill: false
                    },
                    {
                        label: "Discharged",
                        backgroundColor: "rgba(75, 192, 192, 1)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        data: recovered,
                        fill: false
                    },
                    {
                        label: "Deaths",
                        backgroundColor: "rgba(255, 206, 86, 1)",
                        borderColor: "rgba(255, 206, 86, 1)",
                        data: deceased,
                        fill: false
                    }
                ]
            };

            $scope.options = {
                scales: {
                    xAxes: [{ stacked: true }],
                    yAxes: [{ stacked: true }]
                },
                legend: {
                    display: true,
                    labels: {
                        fontColor: "rgb(255, 99, 132)"
                    }
                },
                title: {
                    display: true,
                    text: "Interactive Data Till Date"
                }
            };

            // Weekly data filtering
            $scope.data1W = response.data.data;
            const today = new Date("2021-12-15");
            const oneWeekAgo = new Date("2021-12-08");  

            const filtered = $scope.data1W.filter(function (entry) {
                const entryDate = new Date(entry.day);
                console.log(entryDate);
                return entryDate >= oneWeekAgo && entryDate <= today;
            });

            console.log(filtered);

            $.each(filtered, function (index, entry) {
                weeklyLabels.push(entry.day);
                weeklyConfirmed.push(entry.summary.total);
                weeklyRecovered.push(entry.summary.discharged);
                weeklyDeceased.push(entry.summary.deaths);
            });

            $scope.dataWeekely = {
                labels: weeklyLabels,
                datasets: [
                    {
                        label: "Total",
                        backgroundColor: "rgba(255, 99, 132, 1)",
                        borderColor: "rgba(255,99,132,1)",
                        data: weeklyConfirmed
                    },
                    {
                        label: "Discharged",
                        backgroundColor: "rgba(75, 192, 192, 1)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        data: weeklyRecovered
                    },
                    {
                        label: "Deaths",
                        backgroundColor: "rgba(255, 206, 86, 1)",
                        borderColor: "rgba(255, 206, 86, 1)",
                        data: weeklyDeceased
                    }
                ]
            };

            $scope.optionsWeekely = {
                scales: {
                    xAxes: [{ stacked: true }],
                    yAxes: [{ stacked: true }]
                },
                legend: {
                    display: true,
                    labels: {
                        fontColor: "rgb(255, 99, 132)"
                    }
                },
                title: {
                    display: true,
                    text: "Weekely Data"
                }
            };
        });
    });
});
