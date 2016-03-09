'use strict';

angular.module('bootcamp').directive('bcMessage', function() {
  return {
    restrict: 'E',
    template: '<div class="bcMessage"><ng-transclude /></div>',
    transclude: true
  };
});
