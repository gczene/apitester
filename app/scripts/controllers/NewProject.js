/**
 * New project controller.
 * @module apitester/controllers
 */
angular.module('apitester.controllers').controller('NewProjectCtrl', [

    '$scope',
    '$location',
    'projects',

    function ($scope, $location, projects) {

        'use strict';

        // project model
        $scope.project = {
            name: '',
            forms: ''
        };

        /**
         * Navigates back.
         * @api public
         */
        $scope.back = function () {
            history.back();
        };

        /**
         * Saves a new project.
         * @api public
         */
        $scope.save = function () {
            var index = projects.save($scope.project);
            $location.path('/project/' + index);
        };
    }
]);
