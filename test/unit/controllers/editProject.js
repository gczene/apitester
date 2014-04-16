describe('EditProject Controller', function () {

  'use strict';

  var scope, routeParams, filter, location, projects, ctrl;

  beforeEach(module('apitesterApp.controllers'));

  beforeEach(inject(function ($rootScope, $filter, $location, $controller) {
    scope = $rootScope.$new();
    routeParams = {index: 1};
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

  // jslint:unused(ctrl)...
  it('should create a controller', function () {
    expect(ctrl).not.toBeUndefined();
  });

  it('should load a project by index', function () {
    expect(scope.index).toBe(1);
    expect(scope.project).toBe(projects.project);
    expect(scope.formsJson).toBe(filter('json')(projects.project.forms));
  });

  it('should update an existing project', function () {
    location.path('/test');
    expect(scope.project).toEqual({
      name: 'test',
      forms: [{test: true}],
      responses: []
    });
    scope.project.name = 'renamed';
    scope.save();
    expect(scope.project).toEqual({
      name: 'renamed',
      forms: [{test: true}],
      responses: []
    });
    expect(location.path()).toBe('/project/1');
  });
});
