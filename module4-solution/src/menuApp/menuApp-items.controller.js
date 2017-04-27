(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuAppItemsController', MenuAppItemsController);


MenuAppItemsController.$inject = [$stateParams, 'MenuDataService', 'items'];
function MenuAppItemsController($stateParams, MenuDataService, items) {
  var itemsList = this;
  itemsList.categoryShortName = $stateParams.categoryShortName;
  itemsList.items = items.data.menu_items;

}

})();
