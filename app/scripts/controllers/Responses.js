/**
 * Response list controller.
 * @module apitester/controllers
 */
angular.module('apitester.controllers').controller('ResponsesCtrl', [

    '$scope',
    'responses',

    function ($scope, responses) {

        'use strict';

        // list of responses
        $scope.responses = responses.list;

        /**
         * Returns loading state.
         * @returns {Boolean}
         * @api public
         */
        $scope.isLoading = function () {
            return responses.isLoading();
        };

        /**
         * Removes a response by it's index.
         * @param {Number} index
         * @api public
         */
        $scope.remove = function (index) {
            responses.remove(index);
        };
    }
]);
