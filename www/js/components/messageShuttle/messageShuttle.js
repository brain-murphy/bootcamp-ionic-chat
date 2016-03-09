'use strict';

angular.module('bootcamp').directive('bcMessageShuttle', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/components/messageShuttle/messageShuttle.html',
    scope: {},
    replace: true
  };
});
