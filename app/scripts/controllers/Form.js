/**
 * Form controller.
 *
 * @name FormCtrl
 * @constructor
 *
 * @param {!Object} $scope
 * @param {!Object} $http
 * @param {!apitester.services.Projects} projects
 */
angular.module('apitester.controllers').controller('FormCtrl', [

    '$scope',
    '$http',
    'projects',

    function ($scope, $http, projects) {

        'use strict';

        var onSuccess, onError;

        /**
         * Saves a sucessfull request's response.
         *
         * @param {Object} data
         * @param {Number} status
         */
        onSuccess = function (data, status) {
            $scope.project.responses.unshift({
                data: data,
                status: status,
                error: false
            });
            projects.save($scope.project);
        };

        /**
         * Saves an unsucessfull request's response.
         *
         * @param {Object} data
         * @param {Number} status
         */
        onError = function (data, status) {
            $scope.project.responses.unshift({
                data: data,
                status: status,
                error: true
            });
            projects.save($scope.project);
        };

        /**
         * Sends an API request.
         */
        $scope.submit = function () {
            var options;
            if ('get' === $scope.form.method) {
                options = {
                    url: $scope.form.url,
                    method: $scope.form.method,
                    params: $scope.form.data
                };
            } else {
                options = {
                    url: $scope.form.url,
                    method: $scope.form.method,
                    data: $scope.form.data
                };
            }
            $http(options)
                .success(onSuccess)
                .error(onError);
        };
    }
]);
