/**
 * New project controller.
 *
 * @name NewProjectCtrl
 * @constructor
 *
 * @param {!Object} $scope
 * @param {!Object} $location
 * @param {!apitesterApp.services.Projects} projects
 */
angular.module('apitesterApp.controllers').controller('NewProjectCtrl', [

  '$scope',
  '$location',
  'projects',

  function NewProjectCtrl($scope, $location, projects) {

    'use strict';

    // project model
    $scope.project = {
      name: '',
      forms: [],
      responses: []
    };
    $scope.formsJson = '';

    /**
     * Saves a new project.
     */
    $scope.save = function () {
      var index;
      // load form from JSON
      $scope.project.forms = angular.fromJson($scope.formsJson || '[]');
      // save project
      index = projects.save($scope.project);
      $location.path('/project/' + index);
    };
  }
]);
