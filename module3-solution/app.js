(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'loader/itemsloaderindicator.template.html',
    scope: {
      found: '<',
      onRemove: '&'
    }
  };

  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  console.log("Initing controller...");
  var narrowListCtrl = this;

  narrowListCtrl.searchTerm = "";

  narrowListCtrl.getMatchedMenuItems = function (searchTerm) {
    MenuSearchService.getMatchedMenuItems(searchTerm);
  };

  narrowListCtrl.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };

  // narrowListCtrl.filteredItems = function () {
  //   console.log("In controller filterItems property, calling service to find found items...")
  //   MenuSearchService.getFoundItems();
  // };

  narrowListCtrl.filteredItems = MenuSearchService.getFoundItems();
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  console.log("Initing MenuSearchService...");
  var service = this;
  var matchedMenuItems = [];


  service.removeItem = function (itemIndex) {
      matchedMenuItems.splice(itemIndex, 1);
  };

  service.getFoundItems = function () {
    console.log("Calling Get method on service: Matched menu items size: " + matchedMenuItems.length);
    return matchedMenuItems;
  };

  service.getMatchedMenuItems = function (searchTerm) {
    //matchedMenuItems = [];
    console.log("Matched menu items size: " + matchedMenuItems.length);

    console.log("Searching for term: " + searchTerm);
    var promise = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),

    });

    promise.then(function (response) {
      var results = response.data;
      console.log("Filtering data.. first, setting matched items to empty..")
      //matchedMenuItems = [];
      for(var menuItems in results) {
        var menuItem = results[menuItems];
        for(var menuProperty in menuItem) {
          var menu = menuItem[menuProperty];
          var foundSearchTerm = menu.description.search(searchTerm.toLowerCase());
          if (foundSearchTerm != -1) {
            console.log("adding menu item..");
            matchedMenuItems.push(menu);
          }
        }
      }
      console.log("Filtering data completed, matched: " + matchedMenuItems.length);
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  };
}

})();
