(function () {
'use strict';

angular.module('MenuApp')
.component('itemsList', {
  templateUrl: 'src/menuApp/templates/item.template.html',
  bindings: {
    items: '<'
  }
});

})();
