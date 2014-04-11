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
        $scope.project.forms = $filter('json')($scope.project.forms);

        /**
         * Updates the project.
         * @api public
         */
        $scope.save = function () {
            var index;
            $scope.project.forms = angular
                .fromJson($scope.project.forms || '[]');
            index = projects.save($scope.project);
            $location.path('/project/' + index);
        };
    }
]);
