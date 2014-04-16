describe('Project Controller', function () {

  'use strict';

  var scope, location, projects;

  beforeEach(module('apitesterApp.controllers'));

  beforeEach(inject(function ($rootScope, $location) {
    scope = $rootScope.$new();
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
  }));

  describe('invalid index parameter', function () {
    var routeParams, ctrl;

    beforeEach(inject(function ($controller) {
      routeParams = {index: -1};
      ctrl = $controller('ProjectCtrl', {
        $scope: scope,
        $routeParams: routeParams,
        $location: location,
        projects: projects
      });
    }));

    // jslint:unused(ctrl)...
    it('should create a controller', function () {
      expect(ctrl).not.toBeUndefined();
    });

    it('should redirect', function () {
      expect(location.path()).toBe('/new-project');
    });
  });

  describe('valid index parameter', function () {
    var routeParams, ctrl;

    beforeEach(inject(function ($controller) {
      routeParams = {index: 1};
      ctrl = $controller('ProjectCtrl', {
        $scope: scope,
        $routeParams: routeParams,
        $location: location,
        projects: projects
      });
    }));

    // jslint:unused(ctrl)...
    it('should create a controller', function () {
      expect(ctrl).not.toBeUndefined();
    });

    it('should load a project by index', function () {
      expect(scope.index).toBe(routeParams.index);
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
});
