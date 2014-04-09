/**
 * Form controller.
 * @module apitester/controllers
 */
angular.module('apitester.controllers').controller('FormCtrl', [

    '$scope',
    'responses',

    function ($scope, responses) {

        'use strict';

        /**
         * Sends an API request.
         * @api public
         */
        $scope.sendRequest = function () {
            responses.sendRequest({
                url: $scope.form.url,
                method: $scope.form.method,
                data: $scope.form.data
            });
        };
    }
]);
