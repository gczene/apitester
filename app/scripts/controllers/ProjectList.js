/**
 * Project list controller.
 *
 * @name ProjectListCtrl
 * @constructor
 *
 * @param {!Object} $scope
 * @param {!apitester.services.Projects} projects
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
