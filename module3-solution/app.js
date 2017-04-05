(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
//.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


// function FoundItemsDirective() {
//   var ddo = {
//     templateUrl: 'shoppingList.html',
//     scope: {
//       items: '<',
//       title: '@'
//     },
//     // controller: 'ShoppingListDirectiveController as list',
//     //controller: ShoppingListDirectiveController,
//     //controllerAs: 'list',
//     //bindToController: true
//   };
//
//   return ddo;
// }


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  console.log("Initing controller...");
  var narrowListCtrl = this;

  narrowListCtrl.searchTerm = "";

  narrowListCtrl.getMatchedMenuItems = function (searchTerm) {
    MenuSearchService.getMatchedMenuItems(searchTerm);
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  console.log("Initing MenuSearchService...");
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    console.log("Searching for term: " + searchTerm);

    var promise = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),

    });

    var matchedMenuItems = promise.then(function (response) {
        console.log("Response data: " + response.data);
        //TODO filter the results
    })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });
  };
}

})();
