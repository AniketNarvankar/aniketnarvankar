define(['app'], function (app) {
    app.controller("covid19", ['$scope', '$rootScope', '$location', '$timeout', '$mdSidenav', '$http', '$window', '$filter', '$mdDialog', '$cryptojsAHC','$log','$window',function ($scope, $rootScope, $location, $timeout, $mdSidenav, $http, $window, $filter, $mdDialog, $cryptojsAHC,$log,$window) {

        
        $scope.reloadData = function () {
                $window.location.reload();
        }
        
        var date = [];
        var confirmed = [];
        var recovered = [];
        var deaths = [];

        var weekelydate = [];
        var wconfirmed = [];
        var wrecovered = [];
        var wdeaths = [];

        $scope.hide = false;

        $scope.worldWise = function () {
            $location.path('worldData');
        }

        $scope.CovidInfo = function () {
            $location.path('covidInfo');
        }


        $http.get('https://api.covid19india.org/data.json').then(function (response) {
            $scope.error = response.status;
            $scope.hide = false;
            $scope.covid19Tracker = response.data;
            $log.info($scope.error);
         }, function (reason) {
            $scope.error = reason.status;
            $scope.hide = true;
            $log.info(reason);
            $log.info($scope.error);
        })


        $scope.getData = function (state) {

            $scope.stateData = state;
            sessionStorage.setItem('stateName', $scope.stateData);
            $location.path('DistrictWise');
        }

        $http.get('https://api.covid19india.org/data.json').then(function (response) {
            $scope.error = response.status;
            $log.info("I am in Graphs Api");
            $log.info($scope.error);
            $scope.hide = false;
            $scope.data1 = response.data.cases_time_series;
            $.each($scope.data1, function (id, obj) {
                date.push(obj.date);
                confirmed.push(obj.dailyconfirmed);
                recovered.push(obj.dailyrecovered);
                deaths.push(obj.dailydeceased);
            }, function (reason) {
                $scope.error = reason.status;
                $scope.hide = true;
                $log.info(reason);
                $log.info($scope.error);
            })


        })

        $scope.data = {
            labels: date,
            datasets: [
              {

                  label: "Deceased",
                  backgroundColor: 'rgba(255, 206, 86, 1)',
                  borderColor: 'rgba(255, 206, 86, 1)',
                  data: deaths,
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
                   label: "Confirmed",
                   backgroundColor: 'rgba(255, 99, 132, 1)',
                   borderColor: 'rgba(255,99,132,1)',
                   data: confirmed,
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
                text: 'Interactive Graph Till Date'
            }

            // Chart.js options can go here.
        };

        $http.get('https://api.covid19india.org/data.json').then(function (response) {

            $scope.error = response.status;
            $log.info("I am in weekely data graph");
            $log.info($scope.error);

            $scope.hide = false;
            $scope.data1W = response.data.cases_time_series;
            for (var key in $scope.data1W) {
                $scope.data2 = [$scope.data1W[key].date];
            }


            var monthNames = ["No Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            function monthNameToNum(monthname) {
                var month = monthNames.indexOf(monthname);
                return month ? month : 0;
            }

            var today = new Date();
            var month = monthNames[today.getMonth() + 1];
            var currentDay = today.getDate();
            //var month = today.toLocaleDateString('default', { month: 'long' });


            var lastWeekDate = new Date(today.setDate(today.getDate() - 7));
            var lastweekmonth = monthNames[today.getMonth() + 1];
            //var lastweekmonth = lastWeekDate.toLocaleDateString('default', { month: 'long' });
            var lastweekDay = lastWeekDate.getDate();






            var dateNew = currentDay + " " + month;
            var lastWeek = lastweekDay + " " + lastweekmonth;
            //console.log(dateNew);
            //console.log(lastWeek);


            var startDate = new Date(dateNew);


            var endDate = new Date(lastWeek);

            var year = 2020;
            var dateToConvert = dateNew;
            var startDateToConvert = lastWeek;
            //console.log(dateToConvert);
            //console.log(startDateToConvert);

            var datePartOfDate = dateToConvert.split(" ")[0];
            var monthPartOfDate = monthNameToNum(dateToConvert.split(" ")[1]);

            var datePartofStartDate = startDateToConvert.split(" ")[0];

            var monthPartofStartDate = monthNameToNum(startDateToConvert.split(" ")[1]);

            //var finalDate = new Date(year + "-" + monthPartOfDate + "-" + datePartOfDate)

            //var weekStartDate = new Date(year + "-" + monthPartofStartDate + "-" + datePartofStartDate)

            var finalDate = new Date(year, monthPartOfDate - 1, datePartOfDate)

            var weekStartDate = new Date(year, monthPartofStartDate - 1, datePartofStartDate);
            //console.log(finalDate);
            //console.log(weekStartDate);


            var resultWeekelyData = $scope.data1W.filter(function (a) {
                var date = a.date;
                var dateP = date.split(" ")[0];
                //console.log(dateP);
                var monthP = monthNameToNum(date.split(" ")[1]);
                //console.log(monthP);
                //console.log(year + "-" + monthP + "-" + dateP);
                var dateToC = new Date(year, monthP - 1, dateP)
                //console.log(dateToC);

                return (dateToC >= weekStartDate && dateToC <= finalDate);
            });



            $.each(resultWeekelyData, function (id, obj) {
                weekelydate.push(obj.date);
                wconfirmed.push(obj.dailyconfirmed);
                wrecovered.push(obj.dailyrecovered);
                wdeaths.push(obj.dailydeceased);
            })

        }, function (reason) {
            $scope.error = reason.status;
            $scope.hide = true;
            $log.info($scope.error);
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
                text: 'Trends Last 1 Week'
            }

            // Chart.js options can go here.
        };
        
    }])
});