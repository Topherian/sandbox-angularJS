(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath) {

  var service = this;
  var items = [];

  service.getAllCategories = function () {

      console.log("Fetching all categories.. ");
      var promise = $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json"),
      });

      promise.then(function (response) {
        var results = response.data;
        console.log("Results have returned from the REST service..")
        console.log(results);
        for(var category in results) {
          var categoryItem = results[category];
          console.log(categoryItem);
          items.push(categoryItem);
        }
        return items;
      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });
  };
}

})();
