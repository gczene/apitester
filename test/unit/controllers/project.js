describe('ProjectCtrl', function () {

  'use strict';

  var scope, routeParams, filter, location, projects, ctrl;

  beforeEach(module('apitesterApp.controllers'));
  beforeEach(inject(function ($rootScope, $location, $controller) {

    scope = $rootScope.$new();

    routeParams = {
      index: 1
    };

    location = $location;

    projects = {
      project: {
        name: 'test',
        forms: [{test: true}],
        responses: []
      },
      get: function (index) {
        return (index === 1) ? this.project : false;
      },
      remove: function (project) {
        this.project = undefined;
        return 1;
      }
    };

    ctrl = $controller('ProjectCtrl', {
      $scope: scope,
      $routeParams: routeParams,
      $location: $location,
      projects: projects
    });
  }));

  // tests ...

  it('should load a project by index', function () {
    expect(scope.index).toBe(1);
    expect(scope.project).toBe(projects.project);
  });

  it('should remove an existing project', function () {

    // set initial location
    location.path('/test');

    // check the initial project state
    expect(scope.project).toEqual({
      name: 'test',
      forms: [{test: true}],
      responses: []
    });

    // remove the project
    scope.remove();

    // check if the project has been removed
    expect(projects.project).toBeUndefined();

    // check if location has been updated
    expect(location.path()).toBe('/');
  });
});
