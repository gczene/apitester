'use strict';

/**
 * Application.
 * @module apitester
 */
var app = angular.module('apitester', [
    'ngRoute',
    'apitester.services'
]);

// set up routes
app.config(function ($routeProvider) {

    $routeProvider.when('/new-project', {
        controller: 'NewProjectCtrl',
        templateUrl: '/views/newProject.html'
    });

    $routeProvider.when('/project/:index', {
        controller: 'ProjectCtrl',
        templateUrl: '/views/project.html'
    });

    $routeProvider.when('/edit-project/:index', {
        controller: 'EditProjectCtrl',
        templateUrl: '/views/editProject.html'
    });

    $routeProvider.otherwise({
        redirectTo: '/project/0'
    });
});

/**
 * Project list controller.
 */
app.controller('ProjectListCtrl', [

    '$scope',
    'Projects',

    function ($scope, Projects) {

        // list of projects
        $scope.projects = Projects.list();
    }
]);

/**
 * New project controller.
 */
app.controller('NewProjectCtrl', [

    '$scope',
    '$location',
    'Projects',

    function ($scope, $location, Projects) {

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
            var index = Projects.save($scope.project);
            $location.path('/project/' + index);
        };
    }
]);

/**
 * Project controller.
 */
app.controller('ProjectCtrl', [

    '$scope',
    '$routeParams',
    '$location',
    'Projects',

    function ($scope, $routeParams, $location, Projects) {

        var index = $routeParams.index,
            project = Projects.get(index);

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
            Projects.remove(index);
            $location.path('/project/0');
        };
    }
]);

/**
 * Edit project controller.
 */
app.controller('EditProjectCtrl', [

    '$scope',
    '$routeParams',
    '$filter',
    '$location',
    'Projects',

    function ($scope, $routeParams, $filter, $location, Projects) {

        var index = $routeParams.index,
            project = Projects.get(index);

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
            Projects.save($scope.project, index);
            $location.path('/project/' + index);
        };
    }
]);

/**
 * Form controller.
 */
app.controller('FormCtrl', [

    '$scope',
    'Responses',

    function ($scope, Responses) {

        /**
         * Sends an API request.
         * @api public
         */
        $scope.sendRequest = function () {
            Responses.sendRequest({
                url: $scope.form.url,
                method: $scope.form.method,
                data: $scope.form.data
            });
        };
    }
]);

/**
 * Response list controller.
 */
app.controller('ResponsesCtrl', [

    '$scope',
    'Responses',

    function ($scope, Responses) {

        // list of responses
        $scope.responses = Responses.list;

        /**
         * Returns loading state.
         * @returns {Boolean}
         * @api public
         */
        $scope.isLoading = function () {
            return Responses.isLoading();
        };

        /**
         * Removes a response by it's index.
         * @param {Number} index
         * @api public
         */
        $scope.remove = function (index) {
            Responses.remove(index);
        };
    }
]);
