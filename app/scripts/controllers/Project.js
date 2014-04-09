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

        var index = $routeParams.index,
            project = projects.get(index);

        // redirect if project cannot be found
        if (!project) {
            $location.path('/new-project');
        }

        $scope.index = index;
        $scope.title = project.name;
        $scope.project = project;

        /**
         * Removes the project.
         * @api public
         */
        $scope.remove = function () {
            projects.remove(index);
            $location.path('/project/0');
        };
    }
]);
