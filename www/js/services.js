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
        
        function getUid() {
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
            return getUid()
            
                .then(function () {
                    return makeMessage(messageText);
                })
                
                .then(function (message){
                    return MessagesFirebaseArray.$add(message);
                })
        }
        
        return addMessage;
    }
])

/*
    this factory returns an array of messages. messages consist of the message text 
    ('message'), the string id of the user who posted the message ('user'), and the 
    time that the message was created, in milliseconds ('timestamp')
    
    {
        message: '...',
        user: '...',
        timestamp: '...'
    }
    
*/
.factory('MockMessages', ['MESSAGE_LIMIT', 
    function (MESSAGE_LIMIT) {
        var words = ['hey', 'lol', 'jk', 'rofl', 'k', 'wasup', 'wat', 'u', 'lel', 'brb','btw', 'wtf'];
        
        function generateRandomMessageText() {
            var messageText = '';
            
            do {
                var randomIndex = Math.floor(Math.random() * words.length)
                
                messageText += words[randomIndex] + ' '
            } while (Math.random() > .1);  // on average, message consists of ten words
            
            return messageText;
        }
        
        /*
            These mock messages are generated out of a random message text, a fake
            user uid, and the current time in milliseconds.
        */
        function generateMessage() {
            return {
                    message: generateRandomMessageText(),
                    user: 'this is a mock uid',
                    timestamp: Date.now()
                }
        }
        
        var messages = []
        
        for (var i = 0; i < MESSAGE_LIMIT; i++) {
            messages.push(generateMessage());
        }
        
        return messages;
    }
]);