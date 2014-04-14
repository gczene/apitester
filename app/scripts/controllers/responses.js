/**
 * Response list controller.
 *
 * @name ResponsesCtrl
 * @constructor
 *
 * @param {!Object} $scope
 * @param {!Object} $http
 * @param {!apitesterApp.services.Projects} projects
 */
angular.module('apitesterApp.controllers').controller('ResponsesCtrl', [

  '$scope',
  '$http',
  'projects',

  function ResponsesCtrl($scope, $http, projects) {

    'use strict';

    /**
     * Returns loading state.
     *
     * @returns {Boolean}
     */
    $scope.isLoading = function () {
      return $http.pendingRequests.length > 0;
    };

    /**
     * Removes a response by it's index.
     *
     * @param {Object} response
     */
    $scope.remove = function (response) {
      var index = $scope.project.responses.indexOf(response);
      $scope.project.responses.splice(index, 1);
      projects.save($scope.project);
    };
  }
]);
