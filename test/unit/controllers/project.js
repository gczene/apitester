describe('Project Controller', function () {

  'use strict';

  var scope, routeParams, filter, location, projects, ctrl;

  beforeEach(module('apitesterApp.controllers'));

  beforeEach(inject(function ($rootScope, $location, $controller) {
    scope = $rootScope.$new();
    routeParams = {index: 1};
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

  it('should load a project by index', function () {
    expect(scope.index).toBe(1);
    expect(scope.project).toBe(projects.project);
  });

  it('should remove an existing project', function () {
    location.path('/test');
    expect(scope.project).toEqual({
      name: 'test',
      forms: [{test: true}],
      responses: []
    });
    scope.remove();
    expect(projects.project).toBeUndefined();
    expect(location.path()).toBe('/');
  });
});
