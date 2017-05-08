(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };

  service.getShortName = function (shortName) {
    if (shortName) {
      return $http.get(ApiPath + '/menu_items/' + shortName + '.json').then(function (response) {
        console.log("response: " + response.statusText);
        return response;
      }, function errorCallback(response) {
        console.log("Error callback response: " + response.statusText);
        return response;
  });
    }
    else {
        return null;
    }
  };

  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

}



})();
