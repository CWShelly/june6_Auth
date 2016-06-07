const angular = require('angular');
const demoApp = angular.module('demoApp', [require('angular-route')]);

require('./services')(demoApp);
require('./bears')(demoApp);
require('./auth')(demoApp);

demoApp.config(['$routeProvider', function($rp) {
    $rp
    .when('/bears', {
        templateUrl: 'templates/bears/views/bears_view.html',
        controller: 'BearsController',
        controllerAs: 'bearsctrl'
    })
    // AUTH_EXP: how do the signin/up routes differ and what is their relationship
    // with one another

    //The signup route uses a different controller from the signin controller, though both use the same templateUrl and controllerAs. When a user goes to either route, the corresponding controller is used, and the functionality is determined via the ternary operators set up in the a data-ng-hrf tag.
    .when('/signup', {
        templateUrl: 'templates/auth/views/auth_view.html',
        controller: 'SignUpController',
        controllerAs: 'authctrl'
    })
    .when('/signin', {
        templateUrl: 'templates/auth/views/auth_view.html',
        controller: 'SignInController',
        controllerAs: 'authctrl'
    })
    .otherwise({
        redirectTo: '/signup'
    });
}]);
