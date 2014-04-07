'use strict';

/**
 * Application.
 * @module apitester
 */
var app = angular.module('apitester', [ 'apitester.services' ]);

/**
 * Form list controller.
 */
app.controller('FormsCtrl', [

    '$scope',
    '$filter',
    'Forms',

    function ($scope, $filter, Forms) {

        // list of forms
        $scope.forms = Forms.list;

        // form list editor model
        $scope.editor = {
            show: false,
            content: $filter('json')($scope.forms)
        };

        /**
         * Toggles the form list editor form.
         * @api public
         */
        $scope.toggleEditor = function () {
            $scope.editor.show = !$scope.editor.show;
        };

        /**
         * Save the form list editor form.
         * @api public
         */
        $scope.saveForms = function () {
            this.forms = Forms.setList($scope.editor.content);
        };
    }
]);

/**
 * Form list item controller.
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
                params: $scope.form.data
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
