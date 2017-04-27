(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath) {

  var service = this;

  service.getAllCategories = function () {

      console.log("Fetching all categories.. ");
      var promise = $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json"),
      });

      promise.then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });
      return promise;
  };

  service.getItemsForCategory = function (categoryShortName) {

      console.log("Fetching all items under categoryShortName: " + categoryShortName);
      var promise = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName),
      });

      promise.then(function (response) {
        return response.data.menu_items;
      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });
      return promise;
  };
}

})();
