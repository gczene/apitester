'use strict';

/**
 * Services.
 * @module apitester/services
 */
var services = angular.module('apitester.services', []);

/**
 * Projects service.
 */
services.service('Projects', function () {

    var demoProjects, projects, updateLocalStorage;

    // demo projects
    demoProjects = [{
        name: 'OpenWeatherMap',
        forms: [{
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
        }]
    }];

    // list of projects
    projects = angular.fromJson(localStorage.projects) || demoProjects;

    /**
     * Updates the localStorage copy.
     * @api private
     */
    updateLocalStorage = function () {
        localStorage.projects = angular.toJson(projects);
    };

    /**
     * Returns list of projects.
     * @returns {Array}
     * @api public
     */
    this.list = function () {
        return projects;
    };

    /**
     * Returns a project by it's index.
     * @param {Number} index
     * @returns {Object|Boolean}
     */
    this.get = function (index) {
        return projects[index] || false;
    };

    /**
     * Creates / updates a project.
     * @param {Object} project
     * @param {?Number} index
     * @return {Number}
     */
    this.save = function (project, index) {

        // update existing project
        if (!!index) {
            projects[index] = {
                name: project.name,
                forms: angular.fromJson(project.forms || '[]')
            };

        // create new project
        } else {
            index = projects.push({
                name: project.name,
                forms: angular.fromJson(project.forms || '[]')
            });
        }

        updateLocalStorage();
        return index;
    };

    /**
     * Removes a project by it's index.
     * @param {Number} index
     * @api public
     */
    this.remove = function (index) {
        // 0 === demo > cannot be removed !!!
        if (index > 0) {
            projects.splice(index, 1);
            updateLocalStorage();
        }
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
