'use strict';

var app = angular.module('app', []);

/**
 * Forms services.
 */
app.service('Forms', function () {

    var self = this;

    // restore the list of forms from the localStorage
    this.list = angular.fromJson(localStorage.forms) || [];

    /**
     * Updates the localStorage copy.
     * @api private
     */
    var updateLocalStorage = function () {
        localStorage.forms = angular.toJson(self.list);
    };

    /**
     * Overwrites the list of forms.
     * @param {string} list JSON
     * @returns {Array}
     * @api public
     */
    this.setList = function (list) {
        this.list = angular.fromJson(list);
        updateLocalStorage();
        return this.list;
    };
});

/**
 * Responses service.
 */
app.service('Responses', function () {

    var self = this;

    // restore the list of forms from the localStorage
    this.list = angular.fromJson(localStorage.responses) || [];

    /**
     * Updates the localStorage copy.
     * @api private
     */
    var updateLocalStorage = function () {
        localStorage.responses = angular.toJson(self.list);
    };

    /**
     * Removes a response by it's index.
     * @param {Number} index
     * @api public
     */
    this.remove = function (index) {
        this.list.splice(index, 1);
        updateLocalStorage();
    };

    /**
     * Adds a success response to the list.
     * @param {Object} data
     * @param {Number} status
     * @api public
     */
    this.addSuccess = function (data, status) {
        self.list.unshift({
            status: status,
            data: data,
            error: false
        });
        updateLocalStorage();
    };

    /**
     * Adds an error response to the list.
     * @param {Object} data
     * @param {Number} status
     * @api public
     */
    this.addError = function (data, status) {
        self.list.unshift({
            status: status,
            data: data,
            error: true
        });
        updateLocalStorage();
    };
});

/**
 * Form list controller.
 */
app.controller('FormListController', [

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
app.controller('FormController', [

    '$scope',
    '$http',
    'Responses',

    function ($scope, $http, Responses) {

        /**
         * Sends an API request.
         * @api public
         */
        $scope.sendRequest = function () {
            var request = $http({
                url: $scope.form.url,
                method: $scope.form.method,
                params: $scope.form.data
            });
            request.success(Responses.addSuccess);
            request.error(Responses.addError);
        };
    }
]);

/**
 * Response list controller.
 */
app.controller('ResponseListController', [

    '$scope',
    'responseService',

    function ($scope, responseService) {

        // list of responses
        $scope.responses = responseService.list;

        /**
         * Removes a response by it's index.
         * @param {Number} index
         * @api public
         */
        $scope.remove = function (index) {
            responseService.remove(index);
        };
    }
]);
