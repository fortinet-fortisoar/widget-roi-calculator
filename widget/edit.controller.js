'use strict';
(function () {
    angular
        .module('cybersponse')
        .controller('editRoiCalculator100Ctrl', editRoiCalculator100Ctrl);

        editRoiCalculator100Ctrl.$inject = ['$scope', '$uibModalInstance', 'config', 'iconService', '_'];

    function editRoiCalculator100Ctrl($scope, $uibModalInstance, config, iconService, _) {
        $scope.cancel = cancel;
        $scope.save = save;
        $scope.addJobCode = addJobCode;
        $scope.config = config || {};
        $scope.config.showSavings = $scope.config.showSavings || 'cost';
        $scope.config.jobCodes = $scope.config.jobCodes || [];
        $scope.config.currencyIcon = $scope.config.currencyIcon || 'fa fa-usd';
        $scope.config.days = $scope.config.days || 30;
      
        iconService.get().then(function (options) {
          $scope.viewValue = angular.isDefined($scope.config.currencyIcon) ? $scope.config.currencyIcon : 'fa fa-none';
          $scope.currencyIcons = _.filter(options, function(option) {
            return option.categories.indexOf('Currency Icons') > -1 && option.name !== 'Money';
          });
        });

        if ($scope.config.jobCodes.length === 0) {
            $scope.addJobCode();
        }

        function addJobCode() {
            $scope.config.jobCodes.push({
                id: '',
                perHour: 50
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function save() {
            if ($scope.editWidgetForm.$invalid) {
                $scope.editWidgetForm.$setTouched();
                $scope.editWidgetForm.$focusOnFirstError();
                return;
              }
            $uibModalInstance.close($scope.config);
        }

    }
})();
