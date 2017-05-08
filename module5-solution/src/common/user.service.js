(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);


UserService.$inject = ['$http', 'ApiPath'];
function UserService($http, ApiPath) {
  var service = this;
  var userFirstName;
  var userLastName;
  var userAddress;
  var userEmail;
  var userPhone;
  var userFavItem;
  var savedUser = false;

  service.saveUser = function (firstName, lastName, address, email, phone, favItem) {
    userFirstName = firstName;
    userLastName = lastName;
    userAddress = address;
    userEmail = email;
    userPhone = phone;
    userFavItem = favItem;
    savedUser = true;
    console.log ("Saved user: " + userFirstName + " " + userLastName);
  };

  service.getUser = function () {
    console.log("Getting user..")
    var user = {
      firstName : userFirstName,
      lastName : userLastName,
      address : userAddress,
      email : userEmail,
      phone : userPhone,
      favItem : userFavItem,
      saved : savedUser
    };
    return user;
  };

}



})();
