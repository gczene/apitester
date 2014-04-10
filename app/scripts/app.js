/**
 * Application.
 * @module apitester
 */
angular.module('apitester', [

    'ngRoute',
    'apitester.controllers',
    'apitester.services'

]).config(function ($routeProvider) {

    'use strict';

    $routeProvider

        .when('/new-project', {
            controller: 'NewProjectCtrl',
            templateUrl: '/views/newProject.html'
        })

        .when('/project/:index', {
            controller: 'ProjectCtrl',
            templateUrl: '/views/project.html'
        })

        .when('/edit-project/:index', {
            controller: 'EditProjectCtrl',
            templateUrl: '/views/editProject.html'
        })

        .otherwise({
            redirectTo: '/project/0'
        });
});

/**
 * Services.
 * @module apitester/services
 */
angular.module('apitester.services', []);

/**
 * Controllers.
 * @module apitester/controllers
 */
angular.module('apitester.controllers', [
    'apitester.services'
]);
