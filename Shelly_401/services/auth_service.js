var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
    app.factory('cfAuth', ['$http', '$q', function($http, $q) {
    // AUTH_EXP: explain what each of these functions are accomplishing and
    // what data we're storing in this service
        return {
            //removeToken, which is called when the user wants to logout, sets the token, username, and token to null, then removes the token from localStorage by setting it to an empty string.
            removeToken: function() {
                this.token = null;
                this.username = null;
                $http.defaults.headers.common.token = null;
                window.localStorage.token = '';
            },

          //the saveToken method sets the token, headers, and places the token in localStorage.
            saveToken: function(token) {
                this.token = token;
                $http.defaults.headers.common.token = token;
                window.localStorage.token = token;
                return token;
            },
            //the getToken method will either get the newly set token if the user is just signing up, or will retrieve it from localStorage if the user is signng in.
            getToken: function() {
                this.token || this.saveToken(window.localStorage.token);
                return this.token;
            },

    //  When the getUsername method is called, it checks for a username, then runs the getToken method also found on the cfAuth factory object. If there's no token or no token is created, the user will get an error saying, "no authtoken". If there is a token, the getToken method will return it, if it's being created, or save it to local storage to ensure persistence, then return it. After that, a GET request is sent to the backend with the route to api/profile, where the username that is input is set to the username in the database.
            getUsername: function() {
                return $q(function(resolve, reject) {
                    if (this.username) return resolve(this.username);
                    if (!this.getToken()) return reject(new Error('no authtoken'));

                    $http.get(baseUrl + '/api/profile')
            .then((res) => {
                this.username = res.data.username;
                resolve(res.data.username);
            }, reject);
                }.bind(this));
            }
        };
    }]);
};
