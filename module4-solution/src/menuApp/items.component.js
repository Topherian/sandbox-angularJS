(function () {
'use strict';

angular.module('MenuApp')
.component('itemsList', {
  templateUrl: 'src/menuApp/templates/items.template.html',
  bindings: {
    items: '<'
  }
});

})();
