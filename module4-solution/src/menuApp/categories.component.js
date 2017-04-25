(function () {
'use strict';

angular.module('MenuApp')
.component('categoriesList', {
  templateUrl: 'src/menuApp/templates/categories.template.html',
  bindings: {
    items: '<'
  }
});

})();
