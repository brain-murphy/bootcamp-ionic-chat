angular.module('starter.controllers', ['app.services', 'bootcamp']);

angular.module('starter.controllers').controller('ChatsCtrl', ['$scope', 'MockMessages',
  function($scope, MockMessages) {

    $scope.messages = MockMessages;

    $scope.addMessage = function(message) {
      MockMessages.push({
        message: message,
        user: 'mock uid',
        timestamp: Date.now()
      });
    };
  }
]);

angular.module('starter.controllers').controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
