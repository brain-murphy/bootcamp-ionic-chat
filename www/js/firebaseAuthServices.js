/* global angular, Firebase */

angular.module('app.services.firebaseAuth', [])

.constant('FIREBASE_URL', 'https://bootcampchat.firebaseio.com/')

.factory('Auth', ['$firebaseAuth', 'FIREBASE_URL',
	function($firebaseAuth, FIREBASE_URL) {
		var ref = new Firebase(FIREBASE_URL);
		return $firebaseAuth(ref);
	}
])

.factory('AuthManager', ['Auth', '$q', 'FIREBASE_URL',
function (Auth, $q, FIREBASE_URL) {
	function generateRandomEmail() {
		return generateRandomString() + '@fake.turingchat.com';
	}

	function generateRandomString() {
		var alphabet = 'abcdefghijklmnopqrstuvwxyz',
			randomString = '';
		for (var i = 0; i < 10; i++) {
			randomString += alphabet[Math.floor(Math.random() * 26)]
		}

		return randomString;
	}

	function hasLoggedInBefore() {
		return localStorage.email && localStorage.password;
	}

	function getEmail() {
		if (!hasLoggedInBefore()) {
			localStorage.email = generateRandomEmail();
		}
		return localStorage.email;
	}

	function getPassword() {
		if (!hasLoggedInBefore()) {
			localStorage.password = generateRandomString();
		}
		return localStorage.password;
	}

	function getAuthInfo() {
		return {
			email:getEmail(),
			password:getPassword()
		}
	}

	/*
		returns promise that contains the firebase auth property,
		and evaluates once the user info record has been written to the
		database
	*/
	function createUserAndSignIn() {
		return Auth.$createUser(getAuthInfo())
			.then(function (authData) {
				return Auth.$authWithPassword(getAuthInfo());
			})
			.then(addUserInfoToFirebaseRecord);
	}

	function addUserInfoToFirebaseRecord(authData) {
		var usersFirebaseRef = new Firebase(FIREBASE_URL + 'users/' + authData.uid);

		return $q(function (resolve, reject) {
			usersFirebaseRef.set(initializeNewUserRecord(), function () {
					resolve(authData);
			});
		});
	}

	function initializeNewUserRecord(userUid) {
		return {
				score:0,
				num_correct:0,
				num_incorrect:0
		};
	}

	function signIn() {
		if (!Auth.$getAuth()) {
			if (!hasLoggedInBefore()) {
				return createUserAndSignIn();
			} else {
				return Auth.$authWithPassword(getAuthInfo())
                    .catch(function (err) {
                        localStorage.clear();
                        return signIn();
                    });
			}
		} else {
			return $q.when(Auth.$getAuth());
		}
	}

    function getAuth() {
        if (Auth.$getAuth()) {
            $q.when(Auth.$getAuth());
            
        } else {
            return signIn();
        }
    }

	return {
		getAuth: getAuth,
		signIn: signIn
	}
}])


