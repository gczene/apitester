'use strict';

/**
 * Services.
 * @module apitester/services
 */
var services = angular.module('apitester.services', []);

/**
 * Forms service.
 */
services.service('Forms', function () {

    var self = this, demoForms, updateLocalStorage;

    demoForms = [{
        url: 'http://api.openweathermap.org/data/2.5/weather',
        method: 'get',
        label: 'Searching by city name',
        data: {},
        fields: [{ name: 'q', label: 'city name' }]
    }, {
        url: 'http://api.openweathermap.org/data/2.5/weather',
        method: 'get',
        label: 'Seaching by geographic coordinats',
        data: {},
        fields: [
            { name: 'lat', label: 'latitude' },
            { name: 'lon', label: 'longitude' }
        ]
    }, {
        url: 'http://api.openweathermap.org/data/2.5/weather',
        method: 'get',
        label: 'Seaching by city ID',
        data: {},
        fields: [{ name: 'id', label: 'city ID' }]
    }];

    // restore the list of forms from the localStorage (or use the demo)
    this.list = angular.fromJson(localStorage.forms) || demoForms;

    /**
     * Updates the localStorage copy.
     * @api private
     */
    updateLocalStorage = function () {
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
services.service('Responses', [

    '$http',

    function ($http) {

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
            $http(options)
                .success(this.addSuccess)
                .error(this.addError);
        };

        /**
         * Returns loading state.
         * @returns {Boolean}
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
