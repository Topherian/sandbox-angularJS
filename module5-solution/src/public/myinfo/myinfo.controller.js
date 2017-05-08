(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['ApiPath', 'favoriteItem', 'user'];
function MyInfoController(ApiPath, favoriteItem, user) {
  var $ctrl = this;
  var firstName;
  var lastName;
  var email;
  var phone;
  var favItem;
  var userSaved;
  var itemName;
  var itemDescription;
  var itemShortName;

  $ctrl.basePath = ApiPath;

  if (favoriteItem !== undefined) {
    $ctrl.itemName = favoriteItem.data.name;
    $ctrl.itemDescription = favoriteItem.data.description;
    $ctrl.itemShortName = favoriteItem.data.short_name;
  }
  
  $ctrl.firstName = user.firstName;
  $ctrl.lastName = user.lastName;
  $ctrl.address = user.address;
  $ctrl.email = user.email;
  $ctrl.phone = user.phone;
  $ctrl.favItem = user.favItem;
  $ctrl.userSaved = user.saved;

};




})();
