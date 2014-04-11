/**
 * Response list controller.
 * @module apitester/controllers
 */
angular.module('apitester.controllers').controller('ResponsesCtrl', [

    '$scope',
    '$http',
    'projects',

    function ($scope, $http, projects) {

        'use strict';

        /**
         * Returns loading state.
         * @returns {Boolean}
         * @api public
         */
        $scope.isLoading = function () {
            return $http.pendingRequests.length > 0;
        };

        /**
         * Removes a response by it's index.
         * @param {Number} index
         * @api public
         */
        $scope.remove = function (index) {
            $scope.project.responses.splice(index, 1);
            projects.save($scope.project);
        };
    }
]);
