/* global angular, cordova, StatusBar */

angular.module('bootcamp', []);

angular.module('app', ['ionic', 'app.routes', 'starter.controllers', 'app.services.firebaseAuth']);

angular.module('app').run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

angular.module('app').config(['$ionicConfigProvider',
  function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
  }
]);
