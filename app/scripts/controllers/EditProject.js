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

        // project model
        $scope.index = $routeParams.index;
        $scope.project = projects.get($scope.index);

        // redirect if project cannot be found
        if (!$scope.project) {
            $location.path('/new-project');
        }

        // filter forms to editor
        $scope.formsJson = $filter('json')($scope.project.forms);

        /**
         * Updates the project.
         * @api public
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
