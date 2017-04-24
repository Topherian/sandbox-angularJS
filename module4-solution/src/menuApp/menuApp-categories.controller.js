(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuAppCategoriesController', MenuAppCategoriesController);


MenuAppCategoriesController.$inject = ['MenuDataService', 'categoryItems'];
function MenuAppCategoriesController(MenuDataService, categoryItems) {
  var mainList = this;
  //console.log("Controller items: " + categoryItems);
  mainList.categoryItems = categoryItems;
}

})();
