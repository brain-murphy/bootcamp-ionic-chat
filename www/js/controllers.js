angular.module('starter.controllers', ['app.services'])

.controller('ChatsCtrl', ['$scope', 'MessagesFirebaseArray', 'AddMessage', 'MockMessages',
    function($scope, MessagesFirebaseArray, AddMessage, MockMessages) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        
        $scope.messages = MockMessages;
        
        $scope.addMessage = AddMessage;
        
        $scope.getColor = function (message) {
            
        }
        
        $scope.$on('$ionicView.enter', function(e) {
        });
    }
])

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
