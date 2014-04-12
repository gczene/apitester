/**
 * Project controller.
 *
 * @name ProjectCtrl
 * @constructor
 *
 * @param {!Object} $scope
 * @param {!Object} $routeParams
 * @param {!Object} $location
 * @param {!apitester.services.Projects} projects
 */
angular.module('apitester.controllers').controller('ProjectCtrl', [

    '$scope',
    '$routeParams',
    '$location',
    'projects',

    function ($scope, $routeParams, $location, projects) {

        'use strict';

        // project model
        $scope.index = $routeParams.index;
        $scope.project = projects.get($scope.index);

        // redirect if project cannot be found
        if (!$scope.project) {
            $location.path('/new-project');
        }

        /**
         * Removes the project.
         */
        $scope.remove = function () {
            projects.remove($scope.project);
            $location.path('/');
        };
    }
]);
