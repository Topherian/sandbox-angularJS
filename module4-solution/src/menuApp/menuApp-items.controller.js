(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuAppItemsController', MenuAppItemsController);


MenuAppItemsController.$inject = ['$stateParams', 'MenuDataService', 'items'];
function MenuAppItemsController($stateParams, MenuDataService, items) {
  var itemsList = this;
  itemsList.items = items.data;
}

})();
