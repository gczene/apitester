/**
 * Application.
 *
 * @module apitester
 * @requires ngRoute
 * @requires apitester/controllers
 * @requires apitester/services
 */
angular.module('apitester', [
    'ngRoute',
    'apitester.controllers',
    'apitester.services'
]);

/**
 * Services.
 *
 * @module apitester/services
 */
angular.module('apitester.services', []);

/**
 * Controllers.
 *
 * @module apitester/controllers
 * @requires apitester/services
 */
angular.module('apitester.controllers', [
    'apitester.services'
]);

/**
 * Specify routes.
 */
angular.module('apitester').config(function ($routeProvider) {

    'use strict';

    $routeProvider.when('/new-project', {
        controller: 'NewProjectCtrl',
        templateUrl: '/views/newProject.html'
    });

    $routeProvider.when('/project/:index', {
        controller: 'ProjectCtrl',
        templateUrl: '/views/project.html'
    });

    $routeProvider.when('/edit-project/:index', {
        controller: 'EditProjectCtrl',
        templateUrl: '/views/editProject.html'
    });

    $routeProvider.otherwise({
        redirectTo: '/project/0'
    });
});
