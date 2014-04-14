/**
 * Application.
 *
 * @module apitesterApp
 * @requires ngRoute
 * @requires apitesterApp/controllers
 * @requires apitesterApp/services
 */
angular.module('apitesterApp', [
  'ngRoute',
  'apitesterApp.controllers',
  'apitesterApp.services'
]);

/**
 * Services.
 *
 * @module apitesterApp/services
 */
angular.module('apitesterApp.services', []);

/**
 * Controllers.
 *
 * @module apitesterApp/controllers
 * @requires apitesterApp/services
 */
angular.module('apitesterApp.controllers', [
  'apitesterApp.services'
]);

/**
 * Specify routes.
 */
angular.module('apitesterApp').config(function ($routeProvider) {

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
