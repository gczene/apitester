/**
 * Projects service.
 * @module apitester/services
 */
angular.module('apitester.services').service('projects', function () {

    'use strict';

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
     * @api public
     */
    this.get = function (index) {
        return projects[index] || false;
    };

    /**
     * Creates / updates a project.
     * @param {Object} project
     * @param {?Number} index
     * @returns {Number}
     * @api public
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
