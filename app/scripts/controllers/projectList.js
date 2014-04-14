/**
 * Project list controller.
 *
 * @name ProjectListCtrl
 * @constructor
 *
 * @param {!Object} $scope
 * @param {!apitesterApp.services.Projects} projects
 */
angular.module('apitesterApp.controllers').controller('ProjectListCtrl', [

  '$scope',
  'projects',

  function ProjectListCtrl($scope, projects) {

    'use strict';

    // list of projects
    $scope.projects = projects.list();
  }
]);
