/**
 * Projects service.
 *
 * @name Projects
 * @constructor
 */
angular.module('apitesterApp.services').service('projects', function Projects() {

  'use strict';

  var demoProjects, projects, restoreState, saveState;

  // demo projects,
  // some simple forms for the public API of OpenWeatherMap
  demoProjects = [{
    name: 'OpenWeatherMap',
    forms: [{
      url: 'http://api.openweathermap.org/data/2.5/weather',
      method: 'get',
      label: 'Searching by city name',
      fields: [{ name: 'q', label: 'city name' }],
      data: {}
    }, {
      url: 'http://api.openweathermap.org/data/2.5/weather',
      method: 'get',
      label: 'Seaching by geographic coordinats',
      fields: [
        { name: 'lat', label: 'latitude' },
        { name: 'lon', label: 'longitude' }
      ],
      data: {}
    }, {
      url: 'http://api.openweathermap.org/data/2.5/weather',
      method: 'get',
      label: 'Seaching by city ID',
      fields: [{ name: 'id', label: 'city ID' }],
      data: {}
    }],
    responses: []
  }];

  /**
   * Restores projects from localStorage.
   */
  restoreState = function () {
    projects = angular.fromJson(localStorage.projects) || demoProjects;
  };
  restoreState();

  /**
   * Saves prpjects to localStorage.
   */
  saveState = function () {
    localStorage.projects = angular.toJson(projects);
  };

  /**
   * Returns the list of projects.
   *
   * @returns {Object}
   */
  this.list = function () {
    return projects;
  };

  /**
   * Returns a project by it's index.
   *
   * @param {Number} index
   * @returns {Object}
   */
  this.get = function (index) {
    return projects[index] || false;
  };

  /**
   * Saves a single project.
   *
   * @param {Object} project
   * @returns {Number}
   */
  this.save = function (project) {
    var index = projects.indexOf(project);
    if (index !== -1) {
      projects[index] = project;
    } else {
      index = projects.push(project) - 1;
    }
    saveState();
    return index;
  };

  /**
   * Removes a single project.
   *
   * @param {Object} project
   * @returns {Number} Number of projects
   */
  this.remove = function (project) {
    var index = projects.indexOf(project);
    if (index > 0) { // projects[0] = demo
      projects.splice(index, 1);
      saveState();
    }
    return projects.length;
  };
});
