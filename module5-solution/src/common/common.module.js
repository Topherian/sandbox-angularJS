(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://topherian-coursera-mod5.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
