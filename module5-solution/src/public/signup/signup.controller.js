(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'UserService'];
function SignUpController(MenuService, UserService) {
  var $ctrl = this;
  var menuItem;
  var userMessage = "";

  $ctrl.submit = function () {
    $ctrl.completed = true;
    console.log($ctrl.user.firstName + " " + $ctrl.user.lastName + "'s Favorite item: " + $ctrl.user.favItem);
    menuItem = MenuService.getShortName($ctrl.user.favItem).then(function (response) {
      if (response.statusText === "Internal Server Error") {
        userMessage = "No such menu number exists";
      }
      else if (response.statusText === "OK") {
        UserService.saveUser($ctrl.user.firstName, $ctrl.user.lastName,
            $ctrl.user.address, $ctrl.user.email, $ctrl.user.phone, $ctrl.user.favItem);
        userMessage = "Your information has been saved.";
      }
      else {
        console.log("response: " + response.statusText);
        userMessage = "Fall through: No such menu number exists";
      }
    }, function errorCallback(response) {
      console.log("Error callback response: " + response.statusText);
      userMessage = "No such menu number exists";
      $ctrl.completed = false;
});
  };

  $ctrl.getMessage = function() {
    return userMessage;
  };

}


})();
