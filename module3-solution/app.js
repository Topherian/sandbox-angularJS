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
    },
  };
  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {

  var narrowListCtrl = this;

  narrowListCtrl.searchTerm = "";

  narrowListCtrl.getFoundMessage = function() {
    return MenuSearchService.getFoundMessage();
  };

  narrowListCtrl.getMatchedMenuItems = function (searchTerm) {
    console.log("Executing search...");
    MenuSearchService.getMatchedMenuItems(searchTerm);
  };

  narrowListCtrl.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };

  narrowListCtrl.filteredItems = MenuSearchService.getFoundItems();
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {

  var service = this;
  var matchedMenuItems = [];
  var foundMessage = "";

  service.removeItem = function (itemIndex) {
      matchedMenuItems.splice(itemIndex, 1);
  };

  service.getFoundItems = function () {
    return matchedMenuItems;
  };

  service.getFoundMessage = function() {
    return foundMessage;
  };

  service.getMatchedMenuItems = function (searchTerm) {
    if (searchTerm.length === 0) {
      console.log("Search term is empty!!");
      foundMessage = "Nothing found.";
    }
    else {
      foundMessage = "";
      console.log("Searching for term: " + searchTerm);
      var promise = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
      });

      promise.then(function (response) {
        var results = response.data;
        console.log("Filtering data.. first, setting matched items to empty..")
        matchedMenuItems.length = 0;
        for(var menuItems in results) {
          var menuItem = results[menuItems];
          for(var menuProperty in menuItem) {
            var menu = menuItem[menuProperty];
            var foundSearchTerm = menu.description.search(searchTerm.toLowerCase());
            if (foundSearchTerm != -1) {
              matchedMenuItems.push(menu);
            }
          }
        }
        console.log("Filtering data completed, matched: " + matchedMenuItems.length);
        if (matchedMenuItems.length === 0) {
          console.log("After search... nothing found!");
          foundMessage = "Nothing found.";
        }
        return matchedMenuItems;
      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });
    }
  };
}

})();
