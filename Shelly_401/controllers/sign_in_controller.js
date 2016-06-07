var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
    app.controller('SignInController', ['$http', '$location', 'cfHandleError', 'cfAuth', function($http, $location, handleError, auth) {
    // AUTH_EXP: how does this differ from the sign_up_controller?

    //The button text is different. The authenticate method is different. In this controller, this.authenticate sends a GET request to baseUrl + '/api/signin' and setst the headers. Afterwards, it uses the saveToken method on the cfAuth factory services to save the token. Then it runs the getUserName method we mention in the entry.js file. After that, the bears route is fetched and any previously entered bears by the returning user are displayed.If there is an error, the error, "could not sign into user" is given.
        this.buttonText = 'Sign in to existing user';
        this.errors = [];
        this.authenticate = function(user) {
            $http({
                method: 'GET',
                url: baseUrl + '/api/signin',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(user.username + ':' + user.password)
                }
            })
        .then((res) => {
            auth.saveToken(res.data.token);
            auth.getUsername();
            $location.path('/bears');
        }, handleError(this.errors, 'could not sign into user'));
        };
    }]);
};
