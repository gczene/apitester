/**
 * Responses service.
 */
angular.module('apitester.services').service('responses', [

    '$http',

    function ($http) {

        'use strict';

        var self = this, updateLocalStorage;

        // restore the list of forms from the localStorage
        this.list = angular.fromJson(localStorage.responses) || [];

        /**
         * Updates the localStorage copy.
         * @api private
         */
        updateLocalStorage = function () {
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
         * Sends an HTTP request, and saves the response of it.
         * @param {Object} options
         * @api public
         */
        this.sendRequest = function (options) {
            if ('get' === options.method) {
                options.params = options.data;
                delete options.data;
            }
            $http(options)
                .success(this.addSuccess)
                .error(this.addError);
        };

        /**
         * Returns loading state.
         * @returns {Boolean}
         * @api public
         */
        this.isLoading = function () {
            return $http.pendingRequests.length > 0;
        };

        /**
         * Adds a success response to the list.
         * @param {Object} data
         * @param {Number} status
         * @api private
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
         * @api private
         */
        this.addError = function (data, status) {
            self.list.unshift({
                status: status,
                data: data,
                error: true
            });
            updateLocalStorage();
        };
    }
]);
