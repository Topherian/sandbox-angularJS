(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope', '$filter'];

function LunchCheckController($scope, $filter) {
  $scope.lunchItems = "";
  $scope.message = "";

  $scope.checkItems = function () {
    if ($scope.lunchItems.length == 0) {
      $scope.message =  "Please enter data first";
    }
    else {
      var arrayOfItems = $scope.lunchItems.split(',');
      if (arrayOfItems.length <= 3) {
        $scope.message = "Enjoy!";
      }
      else {
        $scope.message = "Too much!"
      }
    }
  };
}
})();
