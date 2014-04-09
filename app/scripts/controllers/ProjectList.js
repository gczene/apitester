/**
 * Project list controller.
 * @module apitester/controllers
 */
angular.module('apitester.controllers').controller('ProjectListCtrl', [

    '$scope',
    'projects',

    function ($scope, projects) {

        'use strict';

        // list of projects
        $scope.projects = projects.list();
    }
]);
