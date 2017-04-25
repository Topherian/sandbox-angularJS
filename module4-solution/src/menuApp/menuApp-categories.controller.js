(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuAppCategoriesController', MenuAppCategoriesController);


MenuAppCategoriesController.$inject = ['MenuDataService', 'items'];
function MenuAppCategoriesController(MenuDataService, items) {
  var mainlist = this;
  mainlist.items = items.data;
}

})();
