/**
 * Edit project controller.
 * @module apitester/controllers
 */
angular.module('apitester.controllers').controller('EditProjectCtrl', [

    '$scope',
    '$routeParams',
    '$filter',
    '$location',
    'projects',

    function ($scope, $routeParams, $filter, $location, projects) {

        'use strict';

        var index = $routeParams.index,
            project = projects.get(index);

        // redirect if project cannot be found
        if (!project) {
            $location.path('/new-project');
        }

        $scope.index = index;
        $scope.title = project.name;
        $scope.project = {
            name: project.name,
            forms: $filter('json')(project.forms)
        };

        /**
         * Navigates back.
         * @api public
         */
        $scope.back = function () {
            history.back();
        };

        /**
         * Updates the project.
         * @api public
         */
        $scope.save = function () {
            projects.save($scope.project, index);
            $location.path('/project/' + index);
        };
    }
]);
