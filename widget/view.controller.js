'use strict';
(function () {
    angular
        .module('cybersponse')
        .controller('roiCalculator100Ctrl', roiCalculator100Ctrl);

        roiCalculator100Ctrl.$inject = ['$scope', 'config', 'playbookService', '_', '$filter', 'PromiseQueue', '$timeout'];

    function roiCalculator100Ctrl($scope, config, playbookService, _, $filter, PromiseQueue, $timeout) {
        $scope.config = config;
        $scope.counts = {
            roi: 0,
            roiFormat: '',
            percentage: 0
        };
        $scope.init = init;

        $scope.init();

        function init() {
            var startDate = new Date();
            $scope.processing = true;
            startDate.setDate(startDate.getDate() - $scope.config.days);
            loadData(startDate).then(function(roi) {
                $scope.counts.roi = roi;
                $scope.counts.roiFormat = $scope.counts.roi > 0 ? secondsToString($scope.counts.roi * 60) : 0;
                var newStartDate = new Date();
                newStartDate.setDate(startDate.getDate() - $scope.config.days * 2);
                loadData(newStartDate, startDate).then(function(previousRoi) {
                    if (previousRoi > 0) {
                        var percentage = parseInt((1 - (roi - previousRoi) / previousRoi) * 100);
                        $scope.counts.percentage = Math.abs(percentage);
                        $scope.counts.increasing = $scope.counts.percentage > 0;
                    }
                });
                $scope.processing = false;
            });

        }

        function loadData(after, before) {
            var countsByJobCode = {};
            var query = {
                tags_include: 'ROI',
                limit: 10000,
                fields: 'tags',
                modified_after: $filter('date')(after, 'yyyy-MM-dd HH:mm', 'UTC')
            };
            if (before) {
                query.modified_before = $filter('date')(before, 'yyyy-MM-dd HH:mm', 'UTC');
            }
            return getRunningPlaybooks(query).then(function(response) {
                var tagLists = _.pluck(response['hydra:member'], 'tags');
                var regexp = /ROI_(?<jobCode>[A-Za-z0-9]+)_(?<minutes>\d+)/g;
                var roi = 0;
                angular.forEach(tagLists, function(tagList) {
                    var match;
                    while ((match = regexp.exec(tagList)) !== null) {
                        countsByJobCode[match.groups.jobCode] = countsByJobCode[match.groups.jobCode] || 0;
                        countsByJobCode[match.groups.jobCode] += parseInt(match.groups.minutes);
                    }
                });
                angular.forEach($scope.config.jobCodes, function(jobCode) {
                    var totalMinutes = countsByJobCode[jobCode.id] ? countsByJobCode[jobCode.id] : 0;
                    if ($scope.config.showSavings === 'time') {
                        roi += totalMinutes;
                    } else if ($scope.config.showSavings === 'cost') {
                        roi += (totalMinutes/60) * jobCode.perHour;
                    }
                });
                return roi;
            });
        }

        function getRunningPlaybooks(query) {
            var key = 'runningPlaybooks-' + query.modified_after + '-' + query.modified_before;
            var queuedPromise = PromiseQueue.get(key);
            if (queuedPromise) {
                return queuedPromise;
            }

            var promise = playbookService.getRunningPlaybooks(query).then(function(response) {
                // Keep the loaded data for 10 seconds
                $timeout(function() {
                    PromiseQueue.set(key, undefined);
                }, 10000);
                return response;
            });
            PromiseQueue.set(key, promise);
            return promise;
        }

        function secondsToString(seconds){
            var value = seconds;
      
            var units = {
              'd': 24*60*60,
              'h': 60*60
            };
      
            var result = [];
      
            for(var name in units) {
              var p =  Math.floor(value/units[name]);
              if(p === 1){result.push(p + name);}
              if(p >= 2){result.push(p + name);}
              value %= units[name];
            }
      
            return result.toString().replace(',', ' ');
          }
    }
})();
