module.exports = function(app) {
    app.controller('AuthController', ['cfAuth', 'cfHandleError',  '$location', function(auth, handleError, $location) {
        this.username = '';
        this.errors = [];
        this.getUsername = function() {
      // AUTH_EXP: What happens when this function is called?
      //auth.getUsername references the method getUsername() on the cfAuth factory object. When it's called through an ng-init when the index.html page loads, it checks for a username, then runs the getToken method also found on the cfAuth factory object. If there's no token or no token is created, the user will get an error saying, "no authtoken". If there is a token, the getToken method will return it, if it's being created, or save it to local storage to ensure persistence, then return it. After that, a GET request is sent to the backend with the route to api/profile, where the username that is input is set to the username in the database.
            auth.getUsername()
        .then((currentUser) => {
            this.username = currentUser;
        }, handleError(this.errors, 'could not get username'));
        }.bind(this);

        this.logout = function() {
            auth.removeToken();
            this.username = '';
            $location.path('/signin');
        }.bind(this);
    }]);
};
