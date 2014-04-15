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
        forms: [{ test: true }],
        responses: []
      },
      get: function (index) {
        return this.project;
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

  it('should load a project by index', function () {
    expect(scope.index).toEqual(1);
    expect(scope.project).toEqual(projects.project);
    expect(scope.formsJson).toEqual(filter('json')(projects.project.forms));
  });

  it('should save an existing project', function () {

    location.path('/test');

    scope.project.name = 'renamed';
    scope.save();

    expect(projects.project).toEqual({
      name: 'renamed',
      forms: [{ test: true }],
      responses: []
    });

    expect(location.path(), '/project/1');
  });
});
