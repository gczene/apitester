/**
 * Project controller.
 * @module apitester/controllers
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
         * @api public
         */
        $scope.remove = function () {
            projects.remove($scope.project);
            $location.path('/');
        };
    }
]);
