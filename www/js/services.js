/* global angular */

angular.module('app.services', ['app.services.firebaseAuth'])

.constant('MESSAGE_LIMIT', 50)

.factory('MessagesFirebaseRef', ['FIREBASE_URL', 'AuthManager', 'AuthException',
    function (FIREBASE_URL, AuthManager, AuthException) {
        
        function getMessagesFirebaseRef() {
            return new Firebase(FIREBASE_URL + 'messages/'); 
        }
        
        if (AuthManager.isAuthed()) {
            return getMessagesFirebaseRef();
        } else {
            throw new AuthException('messages not accessible if user not authenticated');
        }
        
    }
])

.factory('MessagesFirebaseArray', ['$firebaseArray', 'MessagesFirebaseRef', 'MESSAGE_LIMIT',
    function ($firebaseArray, MessagesFirebaseRef, MESSAGE_LIMIT) {
       
        function getMostRecentMessages() {
            return MessagesFirebaseRef
                .orderByChild("timestamp")
                .limitToLast(MESSAGE_LIMIT);
        }
        
        function getMessagesFirebaseArray() {
            return $firebaseArray(getMostRecentMessages());
        }
        
        return getMessagesFirebaseArray();
    }
])

.factory('AddMessage', ['AuthManager', 'MessagesFirebaseArray', 
    function (AuthManager, MessagesFirebaseArray) {
        
        function makeMessage (messageText) {
            return {
                message: messageText,
                user: AuthManager.getAuth().uid,
                timestamp: Firebase.ServerValue.TIMESTAMP
            }
        }
        
        function addMessage (messageText) {
            var message = makeMessage(messageText);
            
            return MessagesFirebaseArray.$add(message);
        }
        
        return addMessage;
    }
]);