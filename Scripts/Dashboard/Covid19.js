define(['app'], function (app) {
    app.controller("covid19", ['$scope', '$rootScope', '$location', '$timeout', '$mdSidenav', '$http', '$window', '$filter', '$mdDialog', '$cryptojsAHC', function ($scope, $rootScope, $location, $timeout, $mdSidenav, $http, $window, $filter, $mdDialog, $cryptojsAHC) {
        var date = [];
        var confirmed = [];
        var recovered = [];
        var deaths = [];

        var weekelydate = [];
        var wconfirmed = [];
        var wrecovered = [];
        var wdeaths = [];

        $scope.worldWise = function () {
            $location.path('worldData');
        }

        $scope.CovidInfo = function () {
            $location.path('covidInfo');
        }
         

        $http.get('https://api.covid19india.org/data.json').then(function (response) {
            $scope.covid19Tracker = response.data;
            
        })


        $scope.getData = function (state) {
            
                $scope.stateData = state;
                sessionStorage.setItem('stateName', $scope.stateData);
            $location.path('DistrictWise');

        }

        $http.get('https://api.covid19india.org/data.json').then(function (response) {
            $scope.data1 = response.data.cases_time_series;
            $.each($scope.data1, function (id, obj) {
                date.push(obj.date);
                confirmed.push(obj.dailyconfirmed);
                recovered.push(obj.dailyrecovered);
                deaths.push(obj.dailydeceased);
            })


        })
        $scope.data = {
            labels: date,
            datasets: [
              {
                  label: "Confirmed",
                  backgroundColor: 'rgba(255, 99, 132, 1)',
                  borderColor: 'rgba(255,99,132,1)',
                  data: confirmed,
                  fill: false
              },
              {
                  label: "Recovered",
                  backgroundColor: 'rgba(75, 192, 192, 1)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  data: recovered,
                  fill: false
              },
               {
                   label: "Deceased",
                   backgroundColor: 'rgba(255, 206, 86, 1)',
                   borderColor: 'rgba(255, 206, 86, 1)',
                   data: deaths,
                   fill: false
               }

            ]
        };

        $scope.options = {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            },
            legend: {
                display: true,
                labels: {
                    fontColor: 'rgb(255, 99, 132)'
                }
            },
            title: {
                display: true,
                text: 'Interactive Data Till Date'
            }

            // Chart.js options can go here.
        };

        $http.get('https://api.covid19india.org/data.json').then(function (response) {
            $scope.data1W = response.data.cases_time_series;
            console.log($scope.data1W);
            for (var key in $scope.data1W) {
                console.log(key);
                $scope.data2 = [$scope.data1W[key].date];
            }


            var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            var today = new Date();
            var month = today.toLocaleString('default', { month: 'long' });
            var currentDay = today.getDate();
            var currentYear = today.getFullYear();


            var lastWeekDate = new Date(today.setDate(today.getDate() - 7));

            var lastweekmonth = lastWeekDate.toLocaleString('default', { month: 'long' });
            var lastweekDay = lastWeekDate.getDate();
            var lastWeekYear = lastWeekDate.getFullYear();
             

          


            var dateNew = currentDay + " " + month + " " + currentYear;
            var lastWeek = lastweekDay + " " + lastweekmonth + " " + lastWeekYear;
            


            var startDate = new Date(lastWeek);
            var endDate = new Date(dateNew);

            //var resultWeekelyData = $scope.data1W.filter(a => {
            //    var date = new Date(a.date);
                
            //    return (date >= startDate && date <= endDate);
            //});

            var resultWeekelyData = $scope.data1W.filter(function(a){
                var date = new Date(a.dateymd);
                console.log(date);
                return (date >= startDate && date <= endDate);
            });
            console.log(resultWeekelyData);
             

            $.each(resultWeekelyData, function (id, obj) {
                weekelydate.push(obj.date);
                wconfirmed.push(obj.dailyconfirmed);
                wrecovered.push(obj.dailyrecovered);
                wdeaths.push(obj.dailydeceased);
            })



        })

        $scope.dataWeekely = {
            labels: weekelydate,
            datasets: [
              {
                  label: "Confirmed",
                  backgroundColor: 'rgba(255, 99, 132, 1)',
                  borderColor: 'rgba(255,99,132,1)',
                  data: wconfirmed
              },
              {
                  label: "Recovered",
                  backgroundColor: 'rgba(75, 192, 192, 1)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  data: wrecovered
              },
               {
                   label: "Deceased",
                   backgroundColor: 'rgba(255, 206, 86, 1)',
                   borderColor: 'rgba(255, 206, 86, 1)',
                   data: wdeaths
               }

            ]
        };


        $scope.optionsWeekely = {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            },
            legend: {
                display: true,
                labels: {
                    fontColor: 'rgb(255, 99, 132)'
                }
            },
            title: {
                display: true,
                text: 'Weekely Data'
            }

            // Chart.js options can go here.
        };

    }])
});
