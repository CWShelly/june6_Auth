var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
    app.controller('SignUpController', ['$http', '$location',  'cfHandleError', 'cfAuth', function($http, $location, handleError, auth) {
    // AUTH_EXP: how does this differ from the sign_in_controller
    // In this controller, this.signup is set to true, and the button text is different. The this.authenticate method is also different. In this version, this.authenticate sets a POST request to baseUrl + 'api/signup', after which it saves the token to the database. After that, the bears route is fetched and the user can now create and store bears to the database.If there is an error, the error, "could not create user" is given.
        this.signup = true;
        this.errors = [];
        this.buttonText = 'Create New User!';
        this.authenticate = function(user) {
            $http.post(baseUrl + '/api/signup', user)
        .then((res) => {
            auth.saveToken(res.data.token);
            auth.getUsername();
            $location.path('/bears');
        }, handleError(this.errors, 'Could not create user'));
        };
    }]);
};
