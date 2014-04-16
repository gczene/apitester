describe('EditProjectCtrl', function () {

  'use strict';

  var scope, routeParams, filter, location, projects, ctrl;

  beforeEach(module('apitesterApp.controllers'));
  beforeEach(inject(function ($rootScope, $filter, $location, $controller) {

    scope = $rootScope.$new();

    routeParams = {
      index: 1
    };

    filter = $filter;

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
      save: function (project) {
        this.project = project;
        return 1;
      }
    };

    ctrl = $controller('EditProjectCtrl', {
      $scope: scope,
      $routeParams: routeParams,
      $filter: $filter,
      $location: $location,
      projects: projects
    });
  }));

  // tests ...

  it('should load a project by index', function () {
    expect(scope.index).toBe(1);
    expect(scope.project).toBe(projects.project);
    expect(scope.formsJson).toBe(filter('json')(projects.project.forms));
  });

  it('should save an existing project', function () {

    // set initial location
    location.path('/test');

    // check the initial project state
    expect(scope.project).toEqual({
      name: 'test',
      forms: [{test: true}],
      responses: []
    });

    // update and save the project
    scope.project.name = 'renamed';
    scope.save();

    // check if the project has been saved
    expect(scope.project).toEqual({
      name: 'renamed',
      forms: [{test: true}],
      responses: []
    });

    // check if location has been updated
    expect(location.path()).toBe('/project/1');
  });
});
