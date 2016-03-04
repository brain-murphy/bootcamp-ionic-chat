/* global angular */

angular.module('app.services', ['firebase', 'app.services.firebaseAuth'])

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

.factory('AddMessage', ['AuthManager', 'MessagesFirebaseArray', '$q',
    function (AuthManager, MessagesFirebaseArray, $q) {
        var uid;
        
        function makeMessage (messageText) {
            return {
                message: messageText,
                user: uid,
                timestamp: Firebase.ServerValue.TIMESTAMP
            }
        }
        
        function getAuthIfNeeded() {
            if (uid) {
                return $q.when(uid);
            } else {
                return AuthManager.getAuth()
                    .then(setUid);
            }
        }
        
        function setUid(authData) {
            uid = authData.uid;
            return uid;
        }
        
        function addMessage (messageText) { 
            return getAuthIfNeeded()
            
                .then(function () {
                    return makeMessage(messageText);
                })
                
                .then(function (message){
                    return MessagesFirebaseArray.$add(message);
                })
        }
        
        return addMessage;
    }
]);